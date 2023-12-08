export default function TableLoadingSpinner () {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
            </div>
        </>

    )
}