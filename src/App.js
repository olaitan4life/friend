import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ chidren, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {chidren}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends); // state lifting step 1
  const [showAddFrient, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSeletion(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);

    function handleSplitBill(value) {
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === selectedFriend.id
            ? { ...friend, balance: friend.balance + value }
            : friend
        )
      );
    }
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sodebar">
        <FriendsList
          friend={friends}
          onSelection={handleSeletion}
          selectedFriend={selectedFriend}
        />{" "}
        // step 5 lifting state
        {showAddFrient && <FormAddFriend onhandAddFriend={handAddFriend} />} //
        lifting state stp2 state lifting
        <Button onClick={handleShowAddFriend}>
          {showAddFrient ? "close" : "Add Friend"}
        </Button>
        {selectedFriend && <FormSlitBill selectedFriend={selectedFriend} />}
      </div>
      {selectedFriend && (
        <FormAddFriend
          onhandAddFriend={handAddFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friend, onSelection, selectedFriend }) {
  // lifting state  step 4
  //   const friends = initialFriends;

  return (
    <ul>
      {friend.map((friend) => {
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />;
      })}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSeleccted = selectedFriend?.id === friend.id;
  return (
    <li className={isSeleccted ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          You owns {friend.name} {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owns {friend.name} {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance > 0 && (
        <p>
          You owns {friend.name} {Math.abs(friend.balance)}${" "}
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSeleccted ? "close" : "selected"}
      </Button>
    </li>
  );
}
//State lifted..........................state lifting step 3
function FormAddFriend({ onhandAddFriend }) {
  const [name, setName] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventdefault();

    if (name || image) return;

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: crypto.randomUUID(),
    };

    onhandAddFriend(newFriend);
    setName("");
    setImage("");
  }

  return (
    <form className="for-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => (setName = e.target.value)}
      />

      <label>🌐Friend URL</label>
      <input type="text" value={image} onChange={(e) => e.target.value} />
      <Button>Add</Button>
    </form>
  );
}

/// controlled Element
function FormSlitBill(selectedFriend, onSplitBill) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventdefault();

    if (bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT BILL WITH {selectedFriend.name} </h2>

      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onClick={(e) => setBill(Number(e.target.value))}
      />

      <label>💸Your Expenses</label>
      <input
        type="text"
        value={paidByUser}
        onClick={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>👯Your Expenses</label>
      <input type="text" disabled value={paidByFriend} />

      <label> W🤑ho is paying the bill</label>
      <select
        type="text"
        value={whoIsPaying}
        onClick={(e) => setWhoIsPaying(e.target.value)}
      >
        <Option value="user">You</Option>
        <Option value="friend">X</Option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
