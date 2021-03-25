import { useState } from 'react'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useContext } from 'react'
import ReducerContext from '../../../context/ReducerContext'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'
import AddGameForm from '../../../components/Games/AddGameForm'
import { useFormik } from 'formik'
import * as yup from 'yup'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 80px;
    flex-direction: row;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
  align-items: center;
  padding: 10px 0;
  width: 95%;
  margin: 10px auto;
  padding: 0 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    width: none;
    min-width: 200px;
    max-width: 45%;
    margin: 20px auto 20px 0;
  }
`

const WrapForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 95%;
  margin: 20px auto;
  padding: 20px 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    width: none;
    min-width: 400px;
    width: 100%;
    margin: 20px auto 50px 0;
  }
`

const StyledTypography = styled(Typography)`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 600px) {
    margin-bottom: 30px;
    text-align: left;
  }
`
let validationSchema = yup.object().shape({
  name: yup.string().required('To pole jest wymagane..'),
  city: yup.string().required('To pole jest wymagane..'),
  street: yup.string().required('To pole jest wymagane..'),
  dateStart: yup.date().required('To pole jest wymagane..').nullable(),
  dateEnd: yup
    .date()
    .min(
      yup.ref('dateStart'),
      'czas zakończenia musi być późniejszy niż rozpoczęcia'
    )
    .required('To pole jest wymagane..')
    .nullable(),
  places: yup.number().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  price: yup.number().required('To pole jest wymagane..'),
  rotationTime1: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('dateStart'),
          'godzina tej rotacji musi być późniejsza niż rozpoczęcie gry'
        )
        .required('To pole jest wymagane..')
        .nullable()
    }),
  rotationTime2: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('rotationTime2'),
          'godzina tej rotacji musi być późniejsza niż poprzedniej'
        )
        .required('To pole jest wymagane..')
        .nullable()
    }),
  rotationTime3: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('rotationTime3'),
          'godzina tej rotacji musi być późniejsza niż poprzedniej'
        )
        .required('To pole jest wymagane..')
        .nullable()
    })
})

const AddedGames = () => {
  const context = useContext(ReducerContext)
  const { gamesData } = context.state
  const [initialValues, setInitialValues] = useState({
    name: '',
    city: '',
    street: '',
    dateStart: null,
    dateEnd: null,
    places: '',
    level: '',
    price: '',
    autoSquads: false,
    rotationTime1: null,
    rotationTime2: null,
    rotationTime3: null
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
    enableReinitialize: true
  })

  const editGame = (gameId) => {
    setInitialValues({
      name: `Pobranie danych gry o id: ${gameId}`,
      city: '',
      street: '',
      dateStart: new Date(),
      dateEnd: null,
      places: '',
      level: '',
      price: '',
      autoSquads: false,
      rotationTime1: null,
      rotationTime2: null,
      rotationTime3: null
    })
  }

  return (
    <StyledContainer>
      {gamesData.length > 0 ? (
        <StyledTypography variant="h5">Twoje gry</StyledTypography>
      ) : (
        <StyledTypography variant="h5">
          Nie dodałeś jeszcze żadnych gier
        </StyledTypography>
      )}
      {gamesData.map((game, index) => {
        return (
          <Wrapper key={game.id}>
            <GamesList
              index={index}
              data={game}
              buttonAction="edit"
              clickHandler={editGame}
              tooltip="edytuj"></GamesList>
          </Wrapper>
        )
      })}
      <WrapForm>
        <AddGameForm formik={formik}></AddGameForm>
      </WrapForm>
    </StyledContainer>
  )
}

export default AddedGames
