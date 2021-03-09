export const reducer = (state, action) => {
  switch (action.type) {
    case 'changePlayer':
      const newPlayers = state.allPlayers.filter(
        (player) => player.id !== '1'
      );
      console.log(newPlayers);
      return { ...state, allPlayers: newPlayers };
    default:
      throw new Error(
        'Nie ma takiej akcji: ' + action.type
      );
  }
};

export const intialState = {
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
      id: '55',
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
      skill: 6,
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
  playersAssignedToGame: [],
  gameDate: '09.03.2020',
  gamePlace: 'Gliwice'
};
