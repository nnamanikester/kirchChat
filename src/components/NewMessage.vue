<template>
  <div class="new-message">
    <form @submit.prevent="sendMessage">
      <label for="new-message">New Message (enter to send message):</label>
      <input type="text" v-model="newMessage" autofocus>
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewMessage',
  props: ['name'],
  data () {
    return {
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    sendMessage () {
      if (this.newMessage) {
        db.collection('messages').add({
          name: this.name,
          content: this.newMessage,
          timestamp: Date.now()
        })
          .catch(err => {
            alert(err)
          })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'You cannot send an empty message'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
