import logo from './logo.svg';
import './App.css';
import UnitTable from "./components/UnitTable";
import React, {useEffect, useState} from "react";

function App() {
    const [units, setUnits] = useState([]);
    const [unitTypes, setUnitTypes] = useState([]);
    const [currentUnits, setCurrentUnits] = useState([]);
    const [currentUnitType, setCurrentUnitType] = useState({id: 0, name: "Loading..."});

    useEffect(() => {
        fetch('http://mul-api.duckdns.org/units', {mode: 'cors'})
            .then(response => response.json())
            .then(data => setUnits(data))
    }, []);

    useEffect(() => {
        fetch('http://mul-api.duckdns.org/unit_types', {mode: 'cors'})
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

    function clickedNavLink(unitType) {
        setCurrentUnitType(unitType);
        window.scrollTo(0, 0);
    };

    return (
        <main className="App">
            <header className="sticky top-0 bg-slate-900 text-white">
                <nav className="flex">
                    <h1 className="text-lg">BT Paper Tokens</h1>
                    <div className="flex overflow-x-auto pl-5">
                        {unitTypes.map(unitType => {
                            return (
                                <button key={unitType.name}
                                        className="titleize m-auto text-xs md:text-base px-1 md:px-2" onClick={() => {
                                    clickedNavLink(unitType);
                                }}>
                                    {unitType.name}
                                </button>
                            )
                        })}
                    </div>
                </nav>
            </header>
            <div>
                <UnitTable units={currentUnits} unitType={currentUnitType}/>
            </div>
        </main>
    );
}

export default App;
