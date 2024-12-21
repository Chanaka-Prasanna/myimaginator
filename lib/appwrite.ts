import { Client, Account, ID, Avatars, Databases, Query } from "appwrite";
interface Props {
  endpoint: string;
  projectId: string;
  databaseId: string;
  userCollectionId: string;
  captionsCollectionId: string;
  storageId: string;
}
export const config: Props = {
  endpoint: process.env.NEXT_PUBLIC_APPWITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
  userCollectionId: process.env.NEXT_PUBLIC_USER_COLLECTION_ID as string,
  captionsCollectionId: process.env
    .NEXT_PUBLIC_CAPTIONS_COLLECTIONS_ID as string,
  storageId: process.env.NEXT_PUBLIC_STORAGE_ID as string,
};

const {
  endpoint,
  projectId,
  databaseId,
  userCollectionId,
  captionsCollectionId,
} = config;

// Init your Web SDK
const client = new Client();
export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client.setEndpoint(endpoint).setProject(projectId);

export const createUser = async ({
  email,
  firstName,
  lastName,
  password,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(firstName);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      newAccount.$id,
      {
        email,
        firstName,
        lastName,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Check if there is already an active session
    const currentSession = await account.getSession("current");
    if (currentSession) {
      return currentSession; // Return the existing session
    }
    // Create a new session if no session is active
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    // Create a new session if no session is active
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  }
};

export const logout = async () => {
  try {
    // Delete the current session in Appwrite
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("$id", currentAccount.$id)]
    );

    if (!currentAccount) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const shareCaption = async (
  topic: string,
  tone: string,
  tags: string[],
  caption: string
) => {
  try {
    const user = await account.get();
    console.log(user);
    const userDetails = await databases.getDocument(
      databaseId,
      userCollectionId,
      user.$id
    );
    const captionId = ID.unique();
    const res1 = await databases.createDocument(
      databaseId,
      captionsCollectionId,
      captionId,
      {
        topic,
        tone,
        tags,
        user: user.$id,
        caption,
      }
    );

    await databases.updateDocument(databaseId, userCollectionId, user.$id, {
      captions: [...userDetails.captions, captionId],
    });

    console.log(res1.$id);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllCaptions = async () => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      captionsCollectionId,
      []
    );
    return result.documents.map((post) => ({
      id: post.$id,
      tone: post.tone,
      topic: post.topic,
      tags: post.tags,
      caption: post.caption,
      likes: post.likes,
      postCreatedAt: post.$createdAt,
      user: {
        captions: post.user.captions,
        name: `${post.user.firstName} ${post.user.lastName}`,
        avatar: post.user.avatar,
        isLiked: post.user.likedCaptions.includes(post.$id),
      },
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const like = async (captionId: string, currentLikes: number) => {
  try {
    const user = await account.get();
    console.log(user);

    const userDetails = await databases.getDocument(
      databaseId,
      userCollectionId,
      user.$id
    );

    // Check if the user has already liked this caption
    const hasLiked = userDetails.likedCaptions.includes(captionId);

    if (!hasLiked) {
      // If the user hasn't liked it, increase the like count by 1
      await databases.updateDocument(
        databaseId,
        captionsCollectionId,
        captionId,
        {
          likes: currentLikes + 1,
        }
      );

      // Add the caption ID to the user's likedCaptions array
      const res2 = await databases.updateDocument(
        databaseId,
        userCollectionId,
        user.$id,
        {
          likedCaptions: [...userDetails.likedCaptions, captionId],
        }
      );
      console.log(res2);
    } else {
      // If the user has already liked it, decrease the like count by 1
      await databases.updateDocument(
        databaseId,
        captionsCollectionId,
        captionId,
        {
          likes: currentLikes - 1,
        }
      );

      // Remove the caption ID from the user's likedCaptions array
      const updatedLikedCaptions = userDetails.likedCaptions.filter(
        (id: string) => id !== captionId
      );

      const res2 = await databases.updateDocument(
        databaseId,
        userCollectionId,
        user.$id,
        {
          likedCaptions: updatedLikedCaptions,
        }
      );
      console.log(res2);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
