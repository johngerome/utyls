import { safe } from "./safe.js";

type Users = {
  name: string;
};

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

const { data, error } = await safe<Users[]>(fetchUsers());

if (data) {
  console.log(
    "data",
    data.map((user) => user.name),
  );
}

if (error) {
  console.log("error", error.message);
}
