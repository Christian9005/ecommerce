import axios from "axios";

const API_URL = 'https://inventariomarket-production.up.railway.app/api/Reabastecimiento';

export const getFilters = async () => {
    try {
        const response = await axios.get(`${API_URL}/filtro-reabastecimiento`);
        return response.data;
    } catch (error) {
        console.error('Error getting filters', error);
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos-reabastecer`);
        return response.data;
    } catch (error) {
        console.error('Error getting productos', error);
        throw error;
    }
}

export const updateFilters = async (newFilters: {
    semanas: number;
    cantidadMinimaVendida: number;
    cantidadMinimaStock: number;
}) => {
    try {
        const response = await axios.post(`${API_URL}/configurar-filtros`, newFilters);
        return response.data;
    } catch (error) {
        console.error('Error updating filters: ', error);
        throw error;
    }
}

export const exportProductsToExcel = async () => {
  try {
      const response = await axios.get(`${API_URL}/exportar-productos`, {
          responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ProductosReabastecer.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }  catch (error) {
      console.error('Error exporting products to Excel: ', error);
      throw error;
  }
};