<template>
    <div style="height:100%">
        <div id="map"></div>
    </div>
</template>
<script>
export default {
    name: "maplayer",
    data() {
        return {
            map: "",
        };
    },
    mounted() {
        this.initDate();
    },
    methods: {
        initDate() {
            this.map = L.map("map", {
                center: [24.424271, 101.439068], // 地图中心
                zoom: 5, //缩放比列
                zoomControl: false, //禁用 + - 按钮
                doubleClickZoom: false, // 禁用双击放大
                attributionControl: false, // 移除右下角leaflet标识
            });
            let name = L.layerGroup([
                L.tileLayer(
                    "http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5599eda6504656ba246f63c15ec22a6f",
                    { subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"] }
                ),
                L.tileLayer(
                    "http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5599eda6504656ba246f63c15ec22a6f",
                    { subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"] }
                ),
            ]).addTo(this.map);
            //   this.map.removeLayer(name)  // 移除图层
        },
    },
};
</script>
<style lang="scss" scoped>
#map {
    height: 100%;
}
</style>