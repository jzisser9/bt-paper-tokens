import React, {Component} from "react";
import "./UnitSelection.css";
import axios from "axios";

export default class UnitSelection extends Component {
    handleXButton(position) {
        this.props.setSelectedUnits(this.props.selectedUnits.filter(el => el.position !== position));
    }

    handleGenerate() {
        const unitIds = this.props.selectedUnits.map(unit => unit.id);
        const params = {unit_ids: JSON.stringify(unitIds)};
        const headers = {"Content-Type": "application/json"};
        axios.post(`${process.env.REACT_APP_MUL_API_URL}/unit_sheet.html`, params, {
            headers: headers
        }).then(response => {
            let responseHtml = response.data;
            let win = window.open("", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=0,left=0");
            debugger;
            win.document.body.innerHTML = responseHtml;
        });
    }

    render() {
        const className = this.props.selectedUnits.length > 0 ? "pb-5" : "pb-5 hidden";
        return (
            <div className={className}>
                <ul>
                    {
                        this.props.selectedUnits.map((unit, i) => {
                            return <li key={unit.name + i} className="bg-white text-black p-1 m-1 rounded">
                                <button onClick={() => {
                                    this.handleXButton(unit.position)
                                }}>
                                    ❌
                                </button>
                                <span>{unit.name} {unit.variant}</span>
                            </li>;
                        })
                    }
                </ul>
                <button className="bg-amber-500 hover:bg-amber-700 text-black font-bold py-2 px-4 rounded"
                        onClick={() => this.handleGenerate()}>
                    Generate Sheet
                </button>
            </div>
        );
    }
}