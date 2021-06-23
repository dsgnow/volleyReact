import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('To pole jest wymagane..')
    .max(20, 'nazwa może mieć maksymalnie 20 znaków'),
  city: yup
    .string()
    .required('To pole jest wymagane..')
    .max(20, 'miasto może mieć maksymalnie 20 znaków'),
  street: yup
    .string()
    .required('To pole jest wymagane..')
    .max(20, 'ulica może mieć maksymalnie 20 znaków'),
  dateStart: yup.date().required('To pole jest wymagane..').nullable(),
  dateEnd: yup
    .date()
    .min(
      yup.ref('dateStart'),
      'czas zakończenia musi być późniejszy niż rozpoczęcia'
    )
    .required('To pole jest wymagane..')
    .nullable(),
  places: yup
    .number()
    .required('To pole jest wymagane..')
    .positive('Numer musi być dodatni.')
    .min(1, 'ilość miejsc musi być równa lub większka niż 1')
    .max(36, 'ilość miejsc nie może być większa niż 36'),
  level: yup.string().required('To pole jest wymagane..'),
  price: yup
    .number()
    .required('To pole jest wymagane..')
    .positive('Numer musi być dodatni.')
    .min(1, 'cena musi być równa lub większka niż 1')
    .max(1000, 'cena nie może być większa niż 1000'),
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

export const initialValues = {
  active: true,
  // name: 'ZSOE',
  // city: 'Gliwice',
  // street: 'Chorzowska',
  dateStart: new Date(),
  dateEnd: new Date(),
  // places: '24',
  // level: 'Amatorski',
  // price: '10',
  autoSquads: false,
  rotationTime1: new Date(),
  rotationTime2: new Date(),
  rotationTime3: new Date()
}
