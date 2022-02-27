<template>
    <div class="meter-box">
        <p class="meter-title">{{ title }}</p>

        <div class="meter-container">
            <div class="meter-path">
                <div class="meter-inner" :style="{width: current + '%', backgroundColor: barColor}"></div>
            </div>
            <div class="meter-score">{{ score }}%</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        score: {
            type: Number
        }
    },
    data() {
        return {
            current: 0
        }
    },
    mounted() {
        setInterval(() => {
            if(this.current >= this.score)
                clearInterval();
            else this.current = Math.floor(this.score, this.current + 1);
        });
    },
    computed: {
        barColor() {
            if(this.score >= 90)
                return '#16a085';

            if(this.score >= 75)
                return '#88b554';

            if(this.score >= 60)
                return '#f9ca24';
            
            if(this.score >= 35)
                return '#f39c12'; 

            return '#c0392b';
        }
    }
}
</script>
<style lang="scss" scoped>
.meter-box {
    margin-bottom: 0.3rem;
}

.meter-container {
    display: flex;
    align-items: center;
    transition: 0.2s ease-out transform;

    &:hover {
        transform: scale(1.03);
    }
}

.meter-title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 0.2rem;
}

.meter-path {
    position: relative;
    height: 8px;
    width: 200px;
    border-radius: 4px;
    overflow: hidden;
    background-color: rgba(#6c5ce7, 0.1);
}

.meter-inner {
    height: 100%;
    background-color: #6c5ce7;
    border-radius: 4px;
    width: 0;
    transition: 0.4s ease-out width;
}

.meter-score {
    margin-left: 0.75rem;
    font-size: 12px;
    line-height: 1.05;
    font-weight: bold;
}
</style>