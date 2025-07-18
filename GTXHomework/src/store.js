import { defineStore } from 'pinia'

export const useProfilesStore = defineStore('profiles', {
    state: () => {
        return {
            userId: null,
            profiles: {

            },
            selectedDay: null,
            selectedTime: null
        }
    },
    actions: {
        setUserId(userId) { //set user id
            this.userId = userId
        },
        saveProfile(userId, profiles) { //save corresponding profile info to user id
            this.profiles[userId] = profiles
        },
        setSelectedDay(selectedDay) {
            this.selectedDay = selectedDay
        },
        setSelectedTime(selectedTime) {
            this.selectedTime = selectedTime
        }

    },
    getters: {
        getProfile: (state) => (userId) => {
            return state.profiles[userId]
        }
    }
})
