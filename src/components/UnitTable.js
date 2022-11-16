import React, {Component} from 'react';

export default class UnitTable extends Component {
    render() {
        return (
            <table className="table-auto border-collapse w-full text-xs sm:text-base titleize">
                <thead className="bg-amber-500">
                <tr>
                    <th colSpan="3" className="border border-slate-600">
                        {this.props.unitType["name"] + ' (' + this.props.units.length + ')'}
                    </th>
                </tr>
                <tr>
                    <th className="border border-slate-600">Name</th>
                    <th className="border border-slate-600">Variant</th>
                    <th className="border border-slate-600">MUL Link</th>
                </tr>
                </thead>
                <tbody>
                {this.props.units.map(unit => {
                    return (
                        <tr key={unit.id} className="even:bg-amber-50 odd:bg-amber-100">
                            <td className="border border-slate-600">{unit.name}</td>
                            <td className="border border-slate-600">{unit.variant}</td>
                            <td className="border border-slate-600">
                                <a href={unit.mul_link} target="_blank" rel="noopener noreferrer"
                                   className="text-amber-500">Link</a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}