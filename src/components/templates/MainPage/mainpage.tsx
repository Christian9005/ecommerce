import React, {useEffect, useState} from 'react';
import "./mainpage.scss";
import Input from "../../atoms/Input/input";
import Table from "../../molecules/Table/table";
import Button from "../../atoms/Button/button";
import {
    exportProductsToExcel,
    getFilters,
    getProducts,
    updateFilters
} from '../../../services/reabastecimientoServices';

const Mainpage = () => {
    const [weeks, setWeeks] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [minimumSold, setMinimumSold] = useState('');
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const filtersData = await getFilters();
                setWeeks(filtersData.tiempoEnSemanas.toString());
                setQuantitySold(filtersData.cantidadMinimaVendida.toString());
                setMinimumSold(filtersData.cantidadMinimaStock.toString());
            } catch (error) {
                console.error(error);
            }
        };
        loadFilters();
    }, []);

    const fetchProducts = async () => {
      try {
          const productsData = await getProducts();
          setProducts(productsData);
      } catch (error) {
          console.error(error);
      }
    };

    const handleUpdateFilter = async () => {
        try {
            await updateFilters({
                semanas: parseInt(weeks),
                cantidadMinimaVendida: parseInt(quantitySold),
                cantidadMinimaStock: parseInt(minimumSold)
            });
            alert('Filtros actualizados correctamente.');
        } catch (error) {
            console.error(error);
        }
    };

    const handleExport = async () => {
      try {
          await exportProductsToExcel();
      }  catch (error) {
          console.error('Error generating report: ', error);
      }
    };

    const headers = ['Producto', 'Stock', 'PVP1', 'PVP1 + IVA'];

    const tableData = products.map(products => ({
        Producto: products.nombre,
        Stock: products.cantidadStock,
        PVP1: products.pvp1,
        'PVP1 + IVA': (products.pvp1 * 1.15).toFixed(2)
    }));

    return (
        <div className="mainpage-container">
            <h1>Gestión Inventario</h1>
            <div className="inputs-container">
                <Input
                    label="Rango de tiempo en semanas"
                    placeholder="1"
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                    errorMessage={weeks === '' ? 'Campo Obligatorio' : ''}
                />
                <Input
                    label="Cantidad vendida mayor a"
                    placeholder="1"
                    type="number"
                    value={quantitySold}
                    onChange={(e) => setQuantitySold(e.target.value)}
                    errorMessage={quantitySold === '' ? 'Campo Obligatorio' : ''}
                />
                <Input
                    label="Cantidad minina para activar alarma"
                    placeholder="1"
                    type="number"
                    value={minimumSold}
                    onChange={(e) => setMinimumSold(e.target.value)}
                    errorMessage={minimumSold === '' ? 'Campo Obligatorio' : ''}
                />
                <Button
                    text="Actualizar Filtros"
                    onClick={handleUpdateFilter}
                    variant="secondary"
                />
            </div>
            <Table data={tableData} headers={headers}/>
            <div className="buttons-container">
                <Button
                    text="Refrescar"
                    onClick={fetchProducts}
                    variant="primary"
                />
                <Button
                    text="Generar Reporte"
                    onClick={handleExport}
                    variant="secondary"
                />
            </div>
        </div>
    );
};

export default Mainpage;