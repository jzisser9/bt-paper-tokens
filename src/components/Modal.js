import React, {Component} from "react";
import "./Modal.css";

export default class Modal extends Component {
    handleClose() {
        this.props.setShowModal(false);
    }

    renderHtml() {
        return {__html: this.props.sheetHtml};
    }

    render() {
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <div dangerouslySetInnerHTML={this.renderHtml()}></div>
                    <button type="button" onClick={() => this.handleClose()}>
                        Close
                    </button>
                </section>
            </div>
        );
    }
}