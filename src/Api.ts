const apiKey = process.env.VITE_APP_API_KEY;
const apiUrl = process.env.VITE_APP_API_URL;

export default function postOrderSandwich(
  formValues: SandwichPayload,
  redirectOnSuccess: (imageUrl: string, fileName: string) => void
) {
  if (apiUrl && apiKey) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) =>
        response.json().then((data) => {
          redirectOnSuccess(data.imageUrl, formValues.sandwichName);
        })
      )
      .catch((error) => console.error("Error:", error));
    return;
  } else {
    console.error("internal communication api error.");
  }
}
