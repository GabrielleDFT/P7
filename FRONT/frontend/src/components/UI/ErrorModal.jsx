import ReactDOM from 'react-dom'
import Button from './Button'
import classes from './ErrorModal.module.css'
import Card from './Card'

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ErrorModalOverLay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClickProps={props.onConfirm}>OK</Button>
      </footer>
    </Card>
  )
}

const ErrorModal = (props) => {
  return (
    <>
      {/* Le Backdrop */}
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root'),
      )}

      {/* La Modale */}
      {ReactDOM.createPortal(
        <ErrorModalOverLay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

export default ErrorModal
