import React, { useState } from "react";
import Table from "./Table";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]);

  const handleAddUser = () => {
    const name = prompt("Enter user's name:");
    const email = prompt("Enter user's email:");
    if (name && email) {
      setUsers((prev) => [...prev, { id: Date.now(), name, email }]);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add User
        </button>
      </div>
      <Table
        headers={["Name", "Email"]}
        data={users.map((u) => [u.name, u.email])}
      />
    </div>
  );
};

export default UsersTable;
