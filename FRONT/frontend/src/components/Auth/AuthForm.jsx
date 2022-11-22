import { useRef, useState } from 'react'
import Button from '../UI/Button'
import classes from './authForm.module.css'
import ErrorModal from '../UI/ErrorModal'
import Loader from '../UI/Loader'

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [data, setData] = useState()
  //IsLoading pour mettre un spinner/texte qui prévient que c'est en cours de chargement
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Contrôler si error est à True ou False
  console.log(typeof error)

  if (error) {
    console.log('true')
  } else {
    console.log('false')
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    // Contrôle input pas vide
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      setError({
        title: 'Oups...🙈 un ou plusieurs champs sont vides',
        message: 'Entrez votre email et/ou votre mot de passe',
      })
      return
    }
    // REGEX - Contrôle validité email
    const regExEmail = (value) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    if (!regExEmail(enteredEmail)) {
      setError({
        title: 'Email invalide',
        message: 'Entrez un format de mail valide',
      })
      return
    }

    //Pour se connecter pour récupérer le userId & le token d'authentification
    const url = 'http://localhost:3000/api/authentification/login'

    //async await function fetchHandler()
    const fetchHandler = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const dataResponse = await response.json()

        //Le Server a repondu, le chargement est terminé
        setIsLoading(false)

        if (response.ok) {
          setData(dataResponse)
        } else {
          setError({
            title: 'Authentification Echec',
            message: dataResponse.error,
          })

          throw new Error(dataResponse.error)
        }
        console.log(response)
      } catch (error) {
        // console.log('problème Server')
        // console.log(error)
      }
    }

    //Spinner ou msg que la requête est en cours de chargement
    setIsLoading(true)
    fetchHandler()

    //Pour vider les champs
    emailInputRef.current.value = ''
    passwordInputRef.current.value = ''
  }

  // Pour reset le State Error
  const errorHandler = () => {
    setError(null)
  }
  console.log(data)

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <section className={classes.auth}>
        <h1>Se connecter</h1>

        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Votre email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Votre mot de passe</label>
            <input type="text" id="password" ref={passwordInputRef} />
          </div>

          <div className={classes.actions}>
            {!isLoading && <Button type={'submit'}>Se connecter</Button>}

            {/* {isLoading && <p>En cours de chargement</p>} */}
            {isLoading && <Loader />}
          </div>
        </form>
      </section>
    </>
  )
}

export default AuthForm
