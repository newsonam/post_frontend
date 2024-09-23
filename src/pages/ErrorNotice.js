import React from 'react';
function ErrorNotice(props) {
    return (
        <div className="error-notice p-3">
            <div class="alert alert-danger text-danger fw-bold border-danger d-flex justify-content-between" role="alert">
                {props.message}
                <button className="btn btn-dark" onClick={props.clearError}>X</button>
            </div>
            
        </div>
    );
}
export default ErrorNotice;
