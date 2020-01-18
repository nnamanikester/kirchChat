<template>
  <div class="chat container">
    <h2 class="center-align teal-text">Kirch Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li :class="message.name === name ? 'owner teal lighten-2' : 'grey lighten-2'" v-for="message in messages" :key="message.id">
            <span class="white-text name" v-if="message.name === name">You </span>
            <span class="teal-text name" v-else>{{ message.name }} </span>
            <span class="message" :class="message.name === name ? 'white-text' : '' ">{{ message.content }}</span>
            <span class="grey-text text-darken-3 time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage.vue'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  components: {
    NewMessage
  },
  props: ['name'],
  data () {
    return {
      messages: []
    }
  },
  metaInfo: {
    title: 'Chat'
  },
  created () {
    let ref = db.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style>
  .chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
  }
  .chat span {
    font-size: 1em;
  }
  .chat .time {
    display: block;
    font-size: 0.6em;
    font-style: oblique;
  }
  .chat .message {
    display: block;
    margin-top: -5px;
  }
  .chat .messages {
    max-height: 300px;
    overflow: auto;
  }
  .chat li {
    width: 45%;
    border-radius: 10px;
    padding: 3px 10px;
    margin: 5px;
  }
  .chat .name {
    font-size: 0.7em;
    font-weight: 700;
    text-transform: uppercase;
  }
  .messages::-webkit-scrollbar {
    width: 3px;
  }
  .messages::-webkit-scrollbar-track {
    background: #ddd;
  }
  .messages::-webkit-scrollbar-thumb {
    background: #aaa;
  }
  .chat .owner {
    position: relative;
    left: 54%;
  }
</style>
