import api from "../utils/interceptors";

export async function getCollections() {
  const query = `
    query getCollections {
      collections(first: 10) {
        edges {
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  try {
    const response = await api.post("", {
      query,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors.map(error => error.message).join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const collectionsData = response.data.data?.collections;
    if (!collectionsData) {
      throw new Error("No collections data found");
    }

    return collectionsData;
  } catch (error) {
    console.error("Could not fetch collections:", error.message);
    throw error;
  }
}

export async function getCollectionById(collectionId) {
    const query = `
      query getCollectionById($id: ID!) {
        collection(id: $id) {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                descriptionHtml
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }
    `;
  
    const variables = { id: collectionId };
  
    try {
      const response = await api.post("", {
        query,
        variables,
      });
  
      if (response.data.errors) {
        const errorMessages = response.data.errors.map(error => error.message).join(", ");
        throw new Error(`GraphQL error(s): ${errorMessages}`);
      }
  
      const collectionData = response.data.data?.collection;
      if (!collectionData) {
        throw new Error("No collection data found");
      }
  
      return collectionData;
    } catch (error) {
      console.error("Could not fetch collection items:", error.message);
      throw error;
    }
  }
