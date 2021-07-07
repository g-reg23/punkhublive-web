import create from 'zustand';


export const useStore = create(set => ({
  user: {
    name: '',
    email:'',
    authed: false,
    role:'',
    token:'',
  },
  setUser: info => set(state => ({user:info})),
  bandsFetched: false,
  setBandsFetched: bool => set(state => ({bandsFetched:bool})),
  bands: [],
  setBands: list => set(state => ({bands:[...state.bands, list]})),
}))
