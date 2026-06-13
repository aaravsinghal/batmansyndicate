import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Radio } from 'lucide-react';

// used ai to help build these chat arrays and responses
// honestly would've taken forever to write all these manually
const CONTACTS = [
  { id: 'alfred', name: 'Alfred Pennyworth', role: 'Family Butler', status: 'ONLINE', frequency: '144.80 MHz' },
  { id: 'joker', name: 'Joker', role: 'Chaos Agent', status: 'ONLINE', frequency: '868.15 MHz' },
  { id: 'fox', name: 'Lucius Fox', role: 'R&D Director', status: 'ONLINE', frequency: '433.92 MHz' },
  { id: 'rachel', name: 'Rachel Dawes', role: 'Assistant DA', status: 'ONLINE', frequency: '27.18 MHz' },
  { id: 'superman', name: 'Clark Kent / Superman', role: 'Metropolis Hero', status: 'ONLINE', frequency: '525.00 MHz' },
  { id: 'lex', name: 'Lex Luthor', role: 'CEO / Genius', status: 'ONLINE', frequency: '767.00 MHz' },
  { id: 'wonderwoman', name: 'Diana Prince', role: 'Antique Dealer', status: 'ONLINE', frequency: '612.00 MHz' }
];

// ai generated these initial messages to make it look like real conversations
const INITIAL_CHATS = {
  alfred: [
    { id: 1, sender: 'friend', text: 'Some men just want to watch the world burn, Master Bruce. But you? You\'re trying to save it. How are you holding up?', time: '21:04' },
    { id: 2, sender: 'me', text: 'Long night, Alfred. The city never sleeps. Made some progress on the case though.', time: '21:10' },
    { id: 3, sender: 'friend', text: 'Why do we fall sir? So we can learn to pick ourselves up. Get some rest when you can.', time: '21:11' }
  ],
  joker: [
    { id: 1, sender: 'friend', text: 'Why so serious? Come on, let\'s put a smile on that face! Having fun yet?', time: '20:30' },
    { id: 2, sender: 'me', text: 'Whatever you\'re planning, it ends tonight.', time: '20:31' }
  ],
  fox: [
    { id: 1, sender: 'friend', text: 'Bruce, I\'ve got some new toys for you. Come by R&D when you get a chance. Never leave the cave without it.', time: '19:15' },
    { id: 2, sender: 'me', text: 'Appreciate it, Lucius. Need anything upgraded on the suit?', time: '19:18' }
  ],
  rachel: [
    { id: 1, sender: 'me', text: 'Rachel, are you still at the office? It\'s late.', time: '18:40' },
    { id: 2, sender: 'friend', text: 'It\'s not who I am underneath, but what I do that defines me. And right now I\'m defining paperwork. You okay?', time: '18:45' }
  ],
  superman: [
    { id: 1, sender: 'friend', text: 'Bruce, we need to talk. The Bat is too brutal. 20 years in Gotham... how many good guys are left?', time: '22:15' },
    { id: 2, sender: 'me', text: 'Tell me, do you bleed? You will.', time: '22:18' }
  ],
  lex: [
    { id: 1, sender: 'friend', text: 'The devil\'s not going to come dressed in a red cape. He\'s going to come dressed as something you\'d never expect. Like me.', time: '19:45' },
    { id: 2, sender: 'me', text: 'I\'m watching you, Lex.', time: '19:48' }
  ],
  wonderwoman: [
    { id: 1, sender: 'friend', text: 'I\'ve killed things from other worlds before. Bruce, we need to work together. A storm is coming.', time: '20:55' },
    { id: 2, sender: 'me', text: 'I work alone.', time: '20:56' }
  ]
};

// had to use ai to write all these reply functions
// my brain was fried after writing the first two lol
function respondToAlfred(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Evening, Master Bruce. Endure, Master Wayne. Take it. They'll hate you for it. But that's the point of being Batman. How can I help?";
  }
  else if (lowerMsg.includes('how are you') || lowerMsg.includes('how are things')) {
    return "Doing well, sir. The manor is quiet tonight. Though I must say, the training is nothing, the will is everything. How about yourself?";
  }
  else if (lowerMsg.includes('status') || lowerMsg.includes('report')) {
    return "Nothing unusual to report. Remember, we burn the forest down. But I've taken care of your paperwork. You're welcome.";
  }
  else if (lowerMsg.includes('work') || lowerMsg.includes('business')) {
    return "Wayne Enterprises called. Your father's trust was not misplaced. They need your signature on some documents by Friday.";
  }
  else if (lowerMsg.includes('sleep') || lowerMsg.includes('rest')) {
    return "You should really try to get some sleep. The night is darkest just before the dawn. And I promise you, the dawn is coming.";
  }
  else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return "That's what I'm here for. A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around a young boy's shoulders. Take care.";
  }
  else if (lowerMsg.includes('batman') || lowerMsg.includes('wayne')) {
    return "Why do we fall? So we can learn to pick ourselves up. You're more than just a man in a suit, Master Bruce.";
  }
  else {
    return "Understood, sir. As you said, it's not who you are underneath, but what you do that defines you. Stay safe.";
  }
}
function respondToJoker(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Well hello there, pretty bird! Come to play a game? You know... I'm not a monster. I'm just ahead of the curve.";
  }
  else if (lowerMsg.includes('why') || lowerMsg.includes('crazy')) {
    return "Why so serious? Let's put a smile on that face! Do you want to know why I use a knife? Guns are too quick. You can't savor all the little... emotions.";
  }
  else if (lowerMsg.includes('plan') || lowerMsg.includes('scheme')) {
    return "Do I look like a guy with a plan? I'm a dog chasing cars. I wouldn't know what to do with one if I caught it! You know, I just do things.";
  }
  else if (lowerMsg.includes('gotham') || lowerMsg.includes('city')) {
    return "This city deserves a better class of criminal. And I'm gonna give it to them! See, their morals, their code... it's a bad joke.";
  }
  else if (lowerMsg.includes('batman') || lowerMsg.includes('bruce')) {
    return "You complete me! I think you and I are destined to do this forever. You won't kill me out of some misplaced sense of self-righteousness.";
  }
  else if (lowerMsg.includes('chaos') || lowerMsg.includes('crazy')) {
    return "Introduce a little anarchy. Upset the established order. And everything becomes chaos. I'm an agent of chaos.";
  }
  else if (lowerMsg.includes('stop') || lowerMsg.includes('quit')) {
    return "Never! This is what happens when an unstoppable force meets an immovable object. You truly are incorruptible, aren't you?";
  }
  else if (lowerMsg.includes('magic') || lowerMsg.includes('trick')) {
    return "A little fight in you. I like that. Then you're gonna love me! Here's my card. You know... madness is like gravity. All it takes is a little push.";
  }
  else {
    return "Hahaha! You're interesting. I like you! See, I'm not a monster. I'm just ahead of the curve. Let's see what happens next...";
  }
}

function respondToFox(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Bruce! Good timing. I was just reviewing some interesting prototypes. Let me tell you about my product... it's not for everyone.";
  }
  else if (lowerMsg.includes('status') || lowerMsg.includes('report')) {
    return "Research is going well. The new armor material is showing promising results. Very expensive though. But... it's what you do that defines you.";
  }
  else if (lowerMsg.includes('new') || lowerMsg.includes('gadget') || lowerMsg.includes('toy')) {
    return "I've got something special for you. Come by the office when you can. Just remember, a hero can be anyone. Even someone doing something as simple as putting together a new suit.";
  }
  else if (lowerMsg.includes('suit') || lowerMsg.includes('armor')) {
    return "The suit's holding up well. I made a few adjustments to the mobility joints. Shoulder mobility has been increased by 15%. It's not a car, Mr. Wayne.";
  }
  else if (lowerMsg.includes('work') || lowerMsg.includes('company')) {
    return "Wayne Enterprises is running smoothly. The board meetings are as boring as ever though. Sometimes people deserve to have their faith rewarded.";
  }
  else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return "Just doing my job, Bruce. I'm not the hero Gotham deserves, but I'm the one it needs right now. So I'll suit up and do my part. Stay safe.";
  }
  else if (lowerMsg.includes('car') || lowerMsg.includes('vehicle') || lowerMsg.includes('tumbler')) {
    return "The Tumbler? It's a prototype. Military, urban assault vehicle. Zero to sixty in five seconds. Not exactly street legal. Does it come in black?";
  }
  else {
    return "I'll look into that. Let me know if you need anything else. Endure. You're the hero Gotham deserves, but not the one it needs right now.";
  }
}

// rachel's responses needed to feel real and emotional so i wrote them :> yk with copilot :>>>
function respondToRachel(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Hey you! It's not who I am underneath, but what I do that defines me. Wasn't expecting to hear from you tonight. Everything okay?";
  }
  else if (lowerMsg.includes('how are you') || lowerMsg.includes('how are things')) {
    return "I'm managing. Court cases keep piling up. The night is darkest just before the dawn. And I promise you, the dawn is coming. How about you?";
  }
  else if (lowerMsg.includes('work') || lowerMsg.includes('case') || lowerMsg.includes('court')) {
    return "Work never stops. Sometimes I wonder why I chose this career path. But as someone once said, why do we fall? So we can learn to pick ourselves up.";
  }
  else if (lowerMsg.includes('dinner') || lowerMsg.includes('eat') || lowerMsg.includes('food')) {
    return "I haven't eaten all day. Are you asking me out, Mr. Wayne? Just remember, a hero can be anyone. Even someone doing something as simple as buying dinner.";
  }
  else if (lowerMsg.includes('tired') || lowerMsg.includes('exhausted')) {
    return "You sound tired. Please tell me you're taking care of yourself. It's not who you are underneath, but what you do that defines me. And right now you need rest.";
  }
  else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return "Anytime. You know I'm always here if you need to talk. Sometimes the truth isn't good enough. Sometimes people deserve more.";
  }
  else if (lowerMsg.includes('miss') || lowerMsg.includes('miss you')) {
    return "Miss you too. When's the last time we actually hung out? Too long. As Alfred says, some men just want to watch the world burn. But not us.";
  }
  else if (lowerMsg.includes('batman') || lowerMsg.includes('bruce') || lowerMsg.includes('wayne')) {
    return "It's not who you are underneath, it's what you do that defines you. And you, Bruce Wayne, are trying to save this city. That's who you really are.";
  }
  else {
    return "Alright then. Text me later if you want to talk more. Remember, the night is darkest just before the dawn. I'm here for you.";
  }
}


function respondToSuperman(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Bruce. I didn't expect to hear from you. I hope this isn't about the Bat branding again. I'm just trying to help.";
  }
  else if (lowerMsg.includes('fight') || lowerMsg.includes('battle')) {
    return "I don't want to fight you, Bruce. My mother's name was Martha too. We're more alike than you think.";
  }
  else if (lowerMsg.includes('gotham') || lowerMsg.includes('city')) {
    return "Gotham needs hope, not fear. 20 years in Gotham, Bruce. How many good guys are left? How many stayed that way?";
  }
  else if (lowerMsg.includes('bleed') || lowerMsg.includes('blood')) {
    return "Do I bleed? Yes, Bruce. I bleed. But I'm not your enemy. You're the one who's been hunting me, remember?";
  }
  else if (lowerMsg.includes('help') || lowerMsg.includes('need you')) {
    return "I'm always ready to help. That's why I'm here. But you need to trust me. The world needs both of us.";
  }
  else if (lowerMsg.includes('kryptonite') || lowerMsg.includes('green rock')) {
    return "You have it, don't you? The kryptonite. I know what it feels like to be afraid, Bruce. I'm afraid every day.";
  }
  else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return "You don't need to thank me. Just... maybe trust me a little. I'm on your side.";
  }
  else if (lowerMsg.includes('lex') || lowerMsg.includes('luthor')) {
    return "Lex is dangerous. He's been manipulating us both. We need to stop him before it's too late.";
  }
  else {
    return "Look, Bruce. I get it. You've been through a lot. But so have I. Let's figure this out. For Martha.";
  }
}

// lex was actually fun to write but ai helped with the creepy vibes
function respondToLex(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Mr. Wayne! The billionaire and the alien. What a fascinating conversation this will be. The bell's already been rung.";
  }
  else if (lowerMsg.includes('plan') || lowerMsg.includes('scheme')) {
    return "The devil's not going to come dressed in a red cape. He's going to come dressed as something you'd never expect. Like me. Or like him.";
  }
  else if (lowerMsg.includes('superman') || lowerMsg.includes('clark') || lowerMsg.includes('kent')) {
    return "If God is all-powerful, he cannot be all good. And if he's all good, then he cannot be all-powerful. You see the dilemma, don't you, Bruce?";
  }
  else if (lowerMsg.includes('power') || lowerMsg.includes('control')) {
    return "Knowledge is power. And I have so much knowledge. Do you know the oldest lie in America, Bruce? That power can be innocent.";
  }
  else if (lowerMsg.includes('kryptonite') || lowerMsg.includes('rock')) {
    return "You took it, didn't you? The kryptonite. Good. You'll need it. The red capes are coming. The red capes are coming!";
  }
  else if (lowerMsg.includes('batman') || lowerMsg.includes('bruce')) {
    return "Civilization is on the brink, Bruce. A beast is coming. His name is Superman. The bat must kill the god.";
  }
  else if (lowerMsg.includes('gotham') || lowerMsg.includes('metropolis')) {
    return "Metropolis and Gotham. Two cities, one problem. Gods among us. And I, for one, don't appreciate being ruled by deities.";
  }
  else if (lowerMsg.includes('crazy') || lowerMsg.includes('insane')) {
    return "Crazy? I'm not crazy. I'm just... ahead of the curve. Your son of a bitch brought the war to us!";
  }
  else {
    return "Tick tock, Mr. Wayne. The day is coming. When the bat faces the god. And I'll be there. Popcorn in hand.";
  }
}


function respondToWonderWoman(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Bruce. I've been watching you. You've got that darkness in you. I've seen it before. But you're not the enemy here.";
  }
  else if (lowerMsg.includes('fight') || lowerMsg.includes('battle')) {
    return "I've killed things from other worlds before. I know how to fight. But this isn't about fighting. It's about survival.";
  }
  else if (lowerMsg.includes('superman') || lowerMsg.includes('clark')) {
    return "He's not the threat, Bruce. He's just a man trying to do the right thing. Like you. Like me.";
  }
  else if (lowerMsg.includes('help') || lowerMsg.includes('team') || lowerMsg.includes('work together')) {
    return "A storm is coming, Bruce. I've seen it. We need to work together. All of us. Or there won't be a world left to save.";
  }
  else if (lowerMsg.includes('old') || lowerMsg.includes('century')) {
    return "I've lived for centuries, Bruce. I've seen empires rise and fall. But this? This is different. This is extinction.";
  }
  else if (lowerMsg.includes('darkness') || lowerMsg.includes('hope')) {
    return "You think darkness is your ally? You've merely adopted the dark. I was born in it. But even I know that hope matters.";
  }
  else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return "Don't thank me yet. We haven't won. But maybe... just maybe... we have a chance.";
  }
  else if (lowerMsg.includes('arthur') || lowerMsg.includes('aquaman') || lowerMsg.includes('flash') || lowerMsg.includes('cyborg')) {
    return "There are others out there, Bruce. Metas. We're not alone in this fight. I can help you find them.";
  }
  else {
    return "I've seen your pain, Bruce. The loss. The rage. But you can't let it consume you. That's not who you are. That's not who you're meant to be.";
  }
}


export default function myChats() {

  const [activePerson, setActivePerson] = useState('alfred'); 
  const [allChats, setAllChats] = useState(function() {
    const savedConversations = localStorage.getItem('chats_history');
    if (savedConversations) {
      try {
        const parsedData = JSON.parse(savedConversations);
        return parsedData;
      } catch (err) {
        console.log("welp localStorage broke again", err);
        return INITIAL_CHATS;
      }
    }
    return INITIAL_CHATS;
  });

  const [newMessage, setNewMessage] = useState('');
  const [typingIndicator, setTypingIndicator] = useState(false);
  const scrollRef = useRef(null);

  useEffect(function() {
    localStorage.setItem('chats_history', JSON.stringify(allChats));
  }, [allChats]);

  // scrolls down when new messages come in - wasnt working without this
  useEffect(function() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allChats, activePerson, typingIndicator]);


  let currentPerson = null;
  for (let i = 0; i < CONTACTS.length; i++) {
    if (CONTACTS[i].id === activePerson) {
      currentPerson = CONTACTS[i];
      break;
    }
  }

  let activeMessages = allChats[activePerson];
  if (!activeMessages) {
    activeMessages = [];
  }






  function sendNewMessage(event) {
    event.preventDefault();


    if (newMessage.trim() === '') {
      return;
    }

    const rightNow = new Date();
    const hours = rightNow.getHours();
    const minutes = rightNow.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : '' + hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
    const currentTime = formattedHours + ':' + formattedMinutes;

    const myMsg = {
      id: 'msg-' + Date.now(),
      sender: 'me',
      text: newMessage.trim(),
      time: currentTime
    };

    const existingMsgs = allChats[activePerson] || [];
    const updatedWithMyMsg = [...existingMsgs, myMsg];

    const updatedChats = {
      ...allChats,
      [activePerson]: updatedWithMyMsg
    };
    setAllChats(updatedChats);

    const whatISaid = newMessage.trim();
    setNewMessage('');

    setTypingIndicator(true);
    setTimeout(function() {
      let autoReply = '';

      if (activePerson === 'alfred') {
        autoReply = respondToAlfred(whatISaid);
      } else if (activePerson === 'joker') {
        autoReply = respondToJoker(whatISaid);
      } else if (activePerson === 'fox') {
        autoReply = respondToFox(whatISaid);
      } else if (activePerson === 'rachel') {
        autoReply = respondToRachel(whatISaid);
      } else if (activePerson === 'superman') {
        autoReply = respondToSuperman(whatISaid);
      } else if (activePerson === 'lex') {
        autoReply = respondToLex(whatISaid);
      } else if (activePerson === 'wonderwoman') {
        autoReply = respondToWonderWoman(whatISaid);
      } else {
        autoReply = 'Got it. Talk soon.'; 
      }

      const theirMsg = {
        id: 'reply-' + Date.now(),
        sender: 'friend',
        text: autoReply,
        time: currentTime
      };

      setAllChats(function(previous) {
        const previousMsgs = previous[activePerson] || [];
        const withTheirReply = [...previousMsgs, theirMsg];
        return {
          ...previous,
          [activePerson]: withTheirReply
        };
      });

      setTypingIndicator(false);
    }, 1500);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700 select-none">
      <div className="md:col-span-1 bg-white border border-gray-200 shadow-card rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
          <Users className="w-4 h-4 text-gray-700" />
          <h2 className="text-gray-900 font-bold text-xs">
            MY CONTACTS
          </h2>
        </div>

        <div className="space-y-1.5">
          {CONTACTS.map(function(person) {
            const isActive = person.id === activePerson;
            return (
              <button
                key={person.id}
                onClick={function() {
                  setActivePerson(person.id);
                  setTypingIndicator(false);
                }}
                className={`w-full text-left p-3 rounded border transition-all active:scale-[0.99] cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-gray-950 text-white border-gray-950 shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      person.status === 'ONLINE' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
                    }`}></div>
                    <span className="font-bold text-[13px]">{person.name}</span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                    {person.role}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono ${
                    isActive
                      ? 'border-gray-800 bg-gray-900 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}>
                    {person.frequency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-2 bg-white border border-gray-200 shadow-card rounded-lg p-4 flex flex-col h-[400px]">

        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-gray-700 animate-pulse" />
            <div>
              <span className="text-gray-900 font-bold  text-xs">
                CHATTING WITH: {currentPerson ? currentPerson.name.toUpperCase() : 'UNKNOWN'}
              </span>
              <span className="ml-3 text-[10px] text-gray-400 font-medium">SECURE CONNECTION</span>
            </div>
          </div>
          <span className="text-[9px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded font-bold">
            LIVE
          </span>
        </div>

        {/* messages*/}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4">
          {activeMessages.map(function(singleMsg) {
            const isFromMe = singleMsg.sender === 'me';

            let displayName = 'OTHER';
            if (isFromMe) {
              displayName = 'ME';
            } else if (currentPerson) {
              displayName = currentPerson.name.split(' ')[0].toUpperCase();
            }

            return (
              <div
                key={singleMsg.id}
                className={`flex flex-col max-w-[80%] ${
                  isFromMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  isFromMe
                    ? 'bg-gray-950 border-gray-950 text-white rounded-tr-none'
                    : 'bg-gray-100 border-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                  {singleMsg.text}
                </div>

                <span className="text-[9px] text-gray-400 mt-1">
                  {displayName} • {singleMsg.time}
                </span>
              </div>
            );
          })}

          {typingIndicator && (
            <div className="flex flex-col max-w-[80%] mr-auto items-start">
              <div className="p-3 rounded-lg border bg-gray-100 border-gray-200 text-gray-400 rounded-tl-none flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] font-semibold text-gray-400">
                  {currentPerson ? currentPerson.name.split(' ')[0] : 'Someone'} is typing...
                </span>
              </div>
            </div>
          )}


          <div ref={scrollRef} />
        </div>


        <form onSubmit={sendNewMessage} className="flex gap-2">
          <input
            type="text"
            placeholder={`Message ${currentPerson ? currentPerson.name.split(' ')[0] : 'Contact'}...`}
            value={newMessage}
            onChange={function(e) {
              setNewMessage(e.target.value);
            }}
            className="flex-1 bg-white border border-gray-300 rounded px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-990 transition-colors"
          />
          <button
            type="submit"
            className="bg-gray-950 hover:bg-gray-900 text-white px-4 rounded flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}