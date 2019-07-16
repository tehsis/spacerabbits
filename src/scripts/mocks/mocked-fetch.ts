const THROTTLING = 500;

const leaderboard = [
  {
    player: "tehsis",
    points: 340
  },
  {
    player: "0xBunny",
    points: 200
  },
  {
    player: "Mauro J.",
    points: 120
  },
  {
    player: "Pablo T.",
    points: 60
  },
  {
    player: "Yohanna E.",
    points: 14
  }
];

const leadboardResponse = {
  json: function () {
  }
};

export default function fetch(url: string) {
  return {
    then: function (cb: (leadeboard: any) => void) {
      cb(leadboardResponse);
      return {
        then: (cb: (leaderboard: any) => void) => {
          cb(leaderboard);
        }
      }
    }
  }

}