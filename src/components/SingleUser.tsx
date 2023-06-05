

export default function SingleUser(props) {
  return (
        <div>
          <p>Email: {props.data.email}</p>
          <p>Display Name: {props.data.displayName}</p>
          {/* <img src={data.profileImg || ''} alt="Profile" /> */} 
        </div>
  )
}
