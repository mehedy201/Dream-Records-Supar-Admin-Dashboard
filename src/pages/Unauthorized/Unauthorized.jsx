
const Unauthorized = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <h3 style={{textAlign: 'center'}}>Unauthorized Access 🚫</h3>
                <p style={{textAlign: 'center'}}>You don’t have permission to view this page.</p>
                <p style={{textAlign: 'center'}}>If you believe this is a mistake or if you require access, please contact the Dream Records support team. We’ll be happy to help you.</p>
            </div>
        </div>
    );
};

export default Unauthorized;