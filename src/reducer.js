export const reducer = (state, action) => {
  switch (action.type) {
    case 'changePlayersAssignedToGame':
      return { ...state, playersAssignedToGame: action.value }
    case 'login':
      return { ...state, user: action.user }
    case 'logout':
      return { ...state, user: null }
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

export const intialState = {
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
  allPlayers: [
    {
      id: '1',
      name: 'Brylant Barber',
      skill: 6,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '2',
      name: 'Piotr Stachowicz',
      skill: 6,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '550',
      name: 'Michał Mieszczyński',
      skill: 5,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '10',
      name: 'Aleksandra Żółkiewicz',
      skill: 3,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '45',
      name: 'Piotr Pawełek',
      skill: 8,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '12',
      name: 'Damian Kita',
      skill: 10,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '17',
      name: 'Wiktoria Jopek',
      skill: 5,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '55',
      name: 'Adam Mru',
      skill: 6,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '19',
      name: 'Rafał Kurkowski',
      skill: 5,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '20',
      name: 'Patryk Kacprzycki',
      skill: 7,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '31',
      name: 'Paweł Bis',
      skill: 4,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '16',
      name: 'MRa Ra',
      skill: 9,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '29',
      name: 'Magda Staniczek',
      skill: 3,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '7',
      name: 'Grzegorz Gil',
      skill: 8,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '50',
      name: 'Aśka Grochowina',
      skill: 3,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '54',
      name: 'Katarzyna Kranz-Kiełtyka',
      skill: 3,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '44',
      name: 'Bartek Król',
      skill: 5,
      endTime: '2021/01/02 0:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '26',
      name: 'Iza Ćwiertnia',
      skill: 4,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'female'
    },
    {
      id: '14',
      name: 'Damian Czapla',
      skill: 10,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '18',
      name: 'Mateusz Szołtysek',
      skill: 7,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '11',
      name: 'Marcin Bosman',
      skill: 8,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '56',
      name: 'Sebastian Boruta',
      skill: 10,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '5',
      name: 'Wojtek Spalik',
      skill: 10,
      endTime: '2021/01/02 00:00:00',
      info: '',
      gender: 'male'
    },
    {
      id: '8',
      name: 'Dorian Pilot',
      skill: 1,
      endTime: '2021/01/02 01:00:00',
      info: '',
      gender: 'male'
    }
  ],
  actualGameId: 1,
  playersAssignedToGame: [],
  gameDate: '09.03.2020',
  gamePlace: 'Gliwice',
  gamesData: [
    {
      id: 1,
      name: 'Chorzowska',
      city: 'Gliwice',
      street: 'Chorzowska 24/11',
      gameTime: '330',
      dateStart: '16.03.2021 21:30',
      dateEnd: '17.03.2021 03:00',
      rotations: [],
      places: 24,
      freePlaces: 12,
      level: 'amatorski',
      price: 10,
      players: [],
      reserve: []
    },
    {
      id: 2,
      name: 'Delfin',
      city: 'Gliwice',
      street: 'Leśna 11/11',
      gameTime: '330',
      dateStart: '24.03.2021 21:30',
      dateEnd: '25.03.2021 03:00',
      rotations: [],
      places: 12,
      freePlaces: 10,
      level: 'amatorski',
      price: 15,
      players: [],
      reserve: []
    },
    {
      id: 3,
      name: 'ZSOE',
      city: 'Zabrze',
      street: 'Nowa 22',
      gameTime: '120',
      dateStart: '29.03.2021 16:30',
      dateEnd: '29.03.2021 18:00',
      rotations: [],
      places: 12,
      freePlaces: 4,
      level: 'amatorski',
      price: 15,
      players: [],
      reserve: []
    }
  ]
}
