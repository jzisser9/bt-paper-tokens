import React, {Component} from "react";

export default class Header extends Component {
    handleNavLink(unitType) {
        this.props.setCurrentUnitType(unitType);
        this.props.setCurrentUnits(this.props.units.filter(unit => unit.unit_type_id === unitType.id))
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <header className="sticky top-0 bg-slate-900 text-white">
                <nav className="flex">
                    <h1 className="text-lg">BT Paper Tokens</h1>
                    <div className="flex overflow-x-auto pl-5">
                        {this.props.unitTypes.map(unitType => {
                            return (
                                <button key={unitType.name}
                                        className="titleize m-auto text-xs md:text-base px-1 md:px-2"
                                        onClick={() => this.handleNavLink(unitType)}>
                                    {unitType.name}
                                </button>
                            )
                        })}
                    </div>
                </nav>
            </header>
        )
    }
}
