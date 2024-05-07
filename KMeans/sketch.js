let km
// data
let points = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  // generating random data
  for (var i = 0; i < 2000; i++) {
    points.push([random(0, 1), random(0, 1)])
  }

  // KMeans object
  km = new KMeans(5)
  km.loadData(points)
  frameRate(15)
}

function draw() {
  background(55)

  km.update()
  km.updateCenter()
  km.show()
}

// generate new random data
function StartSim() {
  document.querySelector(".options").style.transform = "translate(-200vw, -50%)"

  setTimeout(() => {
    let n = document.querySelector("#n").value
    let k = document.querySelector("#k").value

    if (n < 10) n = 10
    if (k < 2) k = 2

    points = []
    for (var i = 0; i < n; i++) {
      points.push([random(0, 1), random(0, 1)])
    }
    km = new KMeans(k)
    km.loadData(points)
  }, 500);

}

function showoptions() {
  document.querySelector(".options").style.transform = "translate(-50%, -50%)"
}

class KMeans {
  // cn = k = number of cluster
  constructor(cn) {
    this.Clusters = []
    this.k = cn
    this.data = []
    this.Lines = false
  }

  loadData(data) {
    // load data
    this.data = data

    // generat initial Clusters
    for (let i = 0; i < this.k; i++) {
      this.Clusters.push({
        center: random(data),
        col: [random(255), random(250), random(255)],
        data: []
      })
    }
  }

  update() {
    // nc => New Clusters
    let nc = []

    for (let d of this.data) {
      let distMat = []
      for (let c of this.Clusters) {
        // calculating distance of each data point to each center
        distMat.push({
          center: c.center,
          dist: dist(c.center[0], c.center[1], d[0], d[1])
        })
      }
      // sorting distance matris to get data point that is closest to the current center
      // closest element will be at index 0
      distMat.sort((a, b) => {
        if (a.dist === b.dist) return 0;
        else return (a.dist < b.dist) ? -1 : 1;
      })
      // adding data and its cluster center to a array
      nc.push({
        center: distMat[0].center,
        data: d
      })
    }

    // generating final cluster sets
    for (let i of this.Clusters) {
      i.data = []
      for (let j of nc) {
        if (i.center == j.center) i.data.push(j.data)
      }
    }
  }


  // once data is assigned to centers, new centers can be computed
  updateCenter() {
    for (let i of this.Clusters) {
      let dx = 0
      let dy = 0
      for (let j of i.data) {
        dx += j[0]
        dy += j[1]
      }
      dx /= i.data.length
      dy /= i.data.length
      i.center = [dx, dy]
    }
  }

  show() {
    for (let c of this.Clusters) {
      // CENTER
      fill(255)
      stroke(c.col[0], c.col[1], c.col[2])
      strokeWeight(4)
      let cx = map(c.center[0], 0, 1, 0, width)
      let cy = map(c.center[1], 0, 1, 0, height)
      circle(cx, cy, 20)

      // DATA
      strokeWeight(8)
      for (let p of c.data) {
        let px = map(p[0], 0, 1, 0, width)
        let py = map(p[1], 0, 1, 0, height)
        point(px, py)
      }
    }
  }

  toggleLines() {
    this.Lines = !this.Lines
  }
}
