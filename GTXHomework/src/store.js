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

            if (this.userId === 'hchoi@corp.globetax.com') {
                this.saveProfile(this.userId, {
                    fullName: 'Heather Choi',
                    origin: 'form.value.hometown',
                    currentCity: 'form.value.currentCity',
                    dualCitizen: false,
                })
            }
        },
        saveProfile(userId, profiles) { //save corresponding profile info to user id
            this.profiles[userId] = profiles
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
