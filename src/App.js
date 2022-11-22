import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import UnitTable from "./components/UnitTable";
import Modal from "./components/Modal";
import UnitSelection from "./components/UnitSelection";

function App() {

    const [units, setUnits] = useState([]);
    const [unitTypes, setUnitTypes] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [currentUnitType, setCurrentUnitType] = useState({id: 0, name: "Loading..."});
    const [showModal, setShowModal] = useState(false);
    const [sheetHtml, setSheetHtml] = useState("<div></div>");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_MUL_API_URL}/units`, {mode: 'cors'})
            .then(response => response.json())
            .then(data => setUnits(data));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_MUL_API_URL}/unit_types`, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                data = data.sort((a, b) => a.name > b.name);
                setUnitTypes(data);
                setCurrentUnitType(data[0]);
            })
    }, []);

    useEffect(() => {
        setCurrentUnits(units.filter(unit => unit["unit_type_id"] === currentUnitType["id"]));
    }, [units, currentUnitType]);

    return (
        <main className="App">
            <Header unitTypes={unitTypes} units={units} setCurrentUnitType={setCurrentUnitType}
                    setCurrentUnits={setCurrentUnits}/>
            <UnitTable selectedUnits={selectedUnits} setSelectedUnits={setSelectedUnits}
                       currentUnitType={currentUnitType} currentUnits={currentUnits}/>
            <Modal showModal={showModal} setShowModal={setShowModal} sheetHtml={sheetHtml}/>
            <footer className="sticky bottom-0 bg-slate-900 text-white">
                <UnitSelection showModal={showModal} setShowModal={setShowModal} selectedUnits={selectedUnits}
                               setSelectedUnits={setSelectedUnits} setSheetHtml={setSheetHtml}/>
            </footer>
        </main>
    );
}

export default App;
