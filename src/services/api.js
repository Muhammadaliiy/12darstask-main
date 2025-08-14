const API_BASE_URL = 'https://json-api.uz/api/project/dessertss';

export const apiService = {
  async getDesserts() {
    try {
      const response = await fetch(`${API_BASE_URL}/desserts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const desserts = data.data.map(item => ({
        ...item,
        image: {
          thumbnail: `/assets/${item.image.thumbnail.split('/').pop()}`,
          mobile: `/assets/${item.image.mobile.split('/').pop()}`,
          tablet: `/assets/${item.image.tablet.split('/').pop()}`,
          desktop: `/assets/${item.image.desktop.split('/').pop()}`
        }
      }));

      return desserts;
    } catch (error) {
      console.error('Error fetching desserts:', error);
      throw error;
    }
  }
};
