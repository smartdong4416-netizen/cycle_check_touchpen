/*
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let drawing = false;
let points = [];

canvas.addEventListener("mousedown", () => {
  drawing = true;
  points = [];
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 過濾太密的點
  if (points.length > 0) {
    const last = points[points.length - 1];
    if (Math.hypot(x - last.x, y - last.y) < 5) return;
  }

  points.push({x, y});
  drawPerfectCircle();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  drawPerfectCircle(); // 最終確認
});

function drawPerfectCircle() {
  if (points.length < 2) return;

  // 計算中心
  let cx = 0, cy = 0;
  points.forEach(p => { cx += p.x; cy += p.y; });
  cx /= points.length;
  cy /= points.length;

  // 計算平均半徑
  const distances = points.map(p => Math.hypot(p.x - cx, p.y - cy));
  const avgR = distances.reduce((a, b) => a + b) / distances.length;

  // 計算平均誤差
  const avgError = distances.reduce((sum, d) => sum + Math.abs(d - avgR), 0) / distances.length;

  // 計算分數 0~100
  let score = Math.max(0, 100 - (avgError / avgR) * 500);

  // 清畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 畫手畫軌跡（淡色）
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  // 畫完美圓（紅色）
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(cx, cy, avgR, 0, Math.PI * 2);
  ctx.stroke();

  // 畫圓心
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // 顯示分數
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("圓度分數: " + score.toFixed(0), 10, 20);
}
*/

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let drawing = false;
let points = [];

canvas.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "pen") return; // ⭐ 只允許筆
  drawing = true;
  points = [];
  e.target.setPointerCapture(e.pointerId); // 捕捉筆
});

canvas.addEventListener("pointermove", (e) => {
  if (!drawing) return;
  if (e.pointerType !== "pen") return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 過濾太密的點
  if (points.length > 0) {
    const last = points[points.length - 1];
    if (Math.hypot(x - last.x, y - last.y) < 5) return;
  }

  points.push({x, y});
  drawPerfectCircle();
});

canvas.addEventListener("pointerup", (e) => {
  if (e.pointerType !== "pen") return;
  drawing = false;
  drawPerfectCircle(); // 最終確認
});

function drawPerfectCircle() {
  if (points.length < 2) return;

  // 計算中心
  let cx = 0, cy = 0;
  points.forEach(p => { cx += p.x; cy += p.y; });
  cx /= points.length;
  cy /= points.length;

  // 計算平均半徑
  const distances = points.map(p => Math.hypot(p.x - cx, p.y - cy));
  const avgR = distances.reduce((a, b) => a + b) / distances.length;

  // 平均誤差 → 分數
  const avgError = distances.reduce((sum, d) => sum + Math.abs(d - avgR), 0) / distances.length;
  let score = Math.max(0, 100 - (avgError / avgR) * 500);

  // 清畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 畫手畫軌跡（淡灰）
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  // 畫完美圓（紅色）
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(cx, cy, avgR, 0, Math.PI * 2);
  ctx.stroke();

  // 畫圓心
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // 顯示分數
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("圓度分數: " + score.toFixed(0), 10, 20);
}