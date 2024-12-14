import React from "react";

interface EmptyResultSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyResultSection: React.FC<EmptyResultSectionProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        background: "#f9f9f9",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: "48px",
            color: "#9e9e9e",
            marginBottom: "16px",
          }}
        >
          {icon}
        </div>
      )}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 0 10px",
          color: "#333",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#666",
          margin: "0",
        }}
      >
        {description}
      </p>
    </section>
  );
};

export default EmptyResultSection;
