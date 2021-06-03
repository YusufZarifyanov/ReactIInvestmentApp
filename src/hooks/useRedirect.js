import { useHistory } from "react-router";

const withData = (WrappedComponent, data) => {
  return (props) => {
    return (
      <WrappedComponent {...props} data={data} />
    )
  }
}

export const useRedirect = (obj, path, param, defaultParam) => {
  const history = useHistory();

  const hasParam = obj[param] ? param : history.push(path)

  const Component = withData(
    obj[hasParam || defaultParam].component,
    obj[hasParam || defaultParam].data
  )

  return Component
}