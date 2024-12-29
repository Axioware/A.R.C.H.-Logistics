export default async function fetchDataWithState(setLoading, setSuccess, url) {
    try {
      // Set initial loading and success states
      setLoading(true);
      setSuccess(false);
  
      // Make the API call
      const response = await fetch(url);
      const data = await response.json(); // Assuming the API returns JSON
  
      // Handle response status
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        return data;
      } else if (response.status === 400) {
        setLoading(false);
        setSuccess(false);
        return { error: 400, message: "Bad Request" };
      } else if (response.status === 401) {
        return { error: 401, message: "Unauthorized" };
      } else if (response.status === 403) {
        return { error: 403, message: "Forbidden" };
      } else if (response.status >= 500) {
        return { error: response.status, message: "Server Error" };
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      setLoading(false);
      setSuccess(false);
      return { error: 400, message: "Failed to fetch data" };
    }
}