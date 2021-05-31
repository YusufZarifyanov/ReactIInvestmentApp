const withData = (WrappedComponent, data) => {
    return (props) => {
        return (
            <WrappedComponent {...props} data={data} />
        )
    }
}

export default withData