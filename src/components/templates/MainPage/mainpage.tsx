import React, {useState} from 'react';
import "./mainpage.scss";
import Input from "../../atoms/Input/input";
import Table from "../../molecules/Table/table";
import Button from "../../atoms/Button/button";

const Mainpage = () => {
    const [weeks, setWeeks] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [minimumSold, setMinimumSold] = useState('');

    const data = [
        {}
    ];

    const headers = ['Producto', 'Stock', 'PVP1', 'PVP1 + IVA'];

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
            </div>
            <Table data={data} headers={headers}/>
            <div className="buttons-container">
                <Button
                    text="Refrescar"
                    onClick={() => {}}
                    variant="primary"
                />
                <Button
                    text="Generar Reporte"
                    onClick={() => {}}
                    variant="secondary"
                />
            </div>
        </div>
    );
};

export default Mainpage;