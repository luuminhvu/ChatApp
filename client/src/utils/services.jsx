/* eslint-disable react-refresh/only-export-components */
export const BaseUrl = "http://localhost:5002";

export const postRequest = async (url, body) => {
  console.log(url, body);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};
export const getRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};
