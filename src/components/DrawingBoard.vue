<template>
    <div class="w-full h-64">
        <canvas class="border rounded"
                id="canvas"
                ref="sign-canvas"
                @mousedown="handleMouseDown"
                @mouseup="handleMouseUp"
                @mousemove="handleMouseMove"
                v-touch:start="touchStart"
                v-touch:moving="touchMove"
                v-touch:end="handleMouseUp"
                @cleardraw="clear">
        </canvas>
    </div>
</template>

<script>
    export default {
        name: "DrawingBoard",
        inject: ["provider"],
        data: function () {
            return {
                mouse: {
                    current: {
                        x: 0,
                        y: 0
                    },
                    previous: {
                        x: 0,
                        y: 0
                    },
                    down: false
                },
                ctx: null
            }
        },
        computed: {},
        mounted() {
            // Initialize canvas
            this.initCanvas();
        },
        methods: {
            initCanvas() {
                this.provider.context = this.$refs['sign-canvas'].getContext('2d');
                this.ctx = this.provider.context;
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 2;
                this.ctx.translate(0.5, 0.5);
                this.ctx.imageSmoothingEnabled = false;

                // Resize the canvas to fit its parent's width.
                // Normally you'd use a more flexible resize system.
                this.$refs['sign-canvas'].width = this.$refs['sign-canvas'].parentElement.clientWidth;
                this.$refs['sign-canvas'].height = this.$refs['sign-canvas'].parentElement.clientHeight;

            },
            touchStart(event) {
                this.mouse.down = true;
                let rect = this.$refs['sign-canvas'].getBoundingClientRect();
                let x = event.targetTouches[0].clientX - rect.left;
                let y = event.targetTouches[0].pageY - rect.top;

                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            },
            touchMove(event) {
                let rect = this.$refs['sign-canvas'].getBoundingClientRect();
                let x = event.targetTouches[0].pageX - rect.left;
                let y = event.targetTouches[0].pageY - rect.top;
                console.log(x, y)

                if (this.mouse.down) {
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                }
            },
            handleMouseDown(event) {
                this.mouse.down = true;
                this.ctx.beginPath();
                this.ctx.moveTo(event.offsetX, event.offsetY)
            },
            handleMouseUp() {
                this.mouse.down = false;
            },
            handleMouseMove(event) {
                if (this.mouse.down) {
                    this.ctx.lineTo(event.offsetX, event.offsetY);
                    this.ctx.stroke();
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.$refs['sign-canvas'].width, this.$refs['sign-canvas'].height);
            }
        }
    }
</script>

<style scoped>
    #canvas {
        touch-action: none;
    }
</style>