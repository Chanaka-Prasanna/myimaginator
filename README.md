# AI-Powered Social Media Caption Generator

🚀 **Project Overview**

This project leverages Google's Gemini 1.5 Flash model to generate engaging, creative captions for social media posts. Users can create, like, and share captions directly on the platform after registering an account. A pricing section will be introduced soon.

---

🌟 **Key Features:**

- ✨ **AI-Powered Captions** – Instantly generate captions using advanced AI technology.
- ❤️ **User Engagement** – Like and share your favorite captions.
- 🔐 **Account Management** – Save and revisit liked captions after logging in.

---

🛠️ **Tools & Technologies:**

- **Frontend:** Next.js (v15)
- **Backend:** Appwrite
- **Styling:** Tailwind CSS, shadcn
- **Language:** TypeScript

---

🏃‍♂️ **Run Locally**

Follow these steps to run the project locally on your machine:

### 📥 Clone the Repository:
```bash
git clone https://github.com/your-repo-url
cd your-repo-name
```

### 📦 Install Dependencies:
```bash
npm install --force
```
**Note:** The `--force` flag is required due to compatibility issues with Next.js 15.

### ⚙️ Configure Environment Variables:
Create a `.env` file in the root directory and add the following keys:

```bash
NEXT_PUBLIC_APPWITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DB_ID=your_database_id
NEXT_PUBLIC_USER_COLLECTION_ID=your_user_collection_id
NEXT_PUBLIC_CAPTIONS_COLLECTIONS_ID=your_captions_collection_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### 🚀 Run the Development Server:
```bash
npm run dev
```
Your application will now be accessible at [http://localhost:3000](http://localhost:3000).

---

🔮 **Coming Soon**

- 💳 **Pricing Section** – Flexible pricing plans to suit your needs.
- 📈 **More Features** – Enhanced caption recommendations and community-driven content.

---

📄 **License**

This project is licensed under the MIT License.
