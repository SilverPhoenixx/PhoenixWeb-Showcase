<template>
    <div>
    <Navigator logged-in="true" />
        <div class="container-fluid p-0">
            <div class="siteHeader">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                        Die Welten
                    <br>
                    <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                        <p class="display-4 p-2" style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
                        Einstellungen
                        </p>
                    </span>
                </h1>
            </div>
            </div>
                </div>
            <div class="p-4 bg-dark"></div>
            <div class="container m-auto mt-5 p-2 shadow-lg rounded">
                <div class="row">
                        <div id="infoContainer" class="col mx-auto bg-primary" hidden><span id="infoText" class="fs-5 text-light">Text</span></div>
                </div>
                <div class="row">
                    <h1>{{this.user?.Username}}</h1>
                    <div class="col-4">
                        <label>Rang</label>
                        <input class="form-control" type="text" :value='this.user?.Role' ref="role">
                    </div>
                    <div class="col-4">
                        <label>Email</label>
                        <input class="form-control" type="text" :value='this.user?.Email' ref="email">
                    </div>
                    <div class="col-4">
                        <label>Password</label>
                        <input class="form-control" type="password" ref="password">
                    </div>
                    <div class="col-12 pt-3">
                        <button @click="updateInformation()" class="btn btn-primary">Aktualisieren</button>
                    </div>
                </div>

            </div>
        
    <Footer />
    </div>
    </template>
    
    <script>
    import Navigator from "../components/Navigator"
    import Footer from "../components/Footer"
    import Slider from "../components/Slider"
    import Warp from "../components/Warp"
    import Builder from "../components/Builder"
    import Vue from "vue"
    export default {
        components: {
            Navigator,
            Footer,
            Slider,
            Warp,
            Builder
        },
        asyncData(context) {
            return {
    
                user: context?.req?.data[0]
            }
        },
        methods: {
            getConfiguration() {
            let config = "";
            for(let i = 0; i < this.configuration.length; i++) {
                if(i == 11 || i > 13) {
                    config += this.configuration[i];
                    continue;
                }
                if(this.$refs["" + i].isChecked()) {
                    config += 1;
                } else {
                    config += 0;
                }
            }
    
            return config;
            },
            removeBuilder(name) {
                fetch("./world/builder/remove",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, builder: name})
                })
                .then(function(res) 
                { 
                    return res.json(); 
                })
                .then(function(data) 
                {
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                    if(data["State"] == "200") {
                        document.getElementById("builder" + name).remove();
                    }
                })
            },
            removeWarp(name) {
                fetch("./world/warp/remove",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, warp: name})
                })
                .then(function(res) 
                { 
                    return res.json(); 
                })
                .then(function(data) 
                {
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                    if(data["State"] == "200") {
                        document.getElementById("warp" + name).remove();
                    }
                })
            },
            getAndClear(name) {
                let value = this.$refs[name].value
                this.$refs[name].value = "";
                return value;
            },
            async addBuilder() {
                let buildername = this.getAndClear("buildername");
    
                let json = await fetch("./world/builder/add",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, buildername})
                });
    
                let data = await json.json();
    
                if(data["State"] == "0") {
                    window.location.href = "./";
                    return;
                }
    
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                    if(data["State"] == "200") {
                        const WarpComponent = Vue.extend(Builder);
                        const warpInstance = new WarpComponent({
                            propsData: {
                                name: buildername,
                                uuid: data["UUID"][0].UUID
                            }
                        });
                        warpInstance.$parent = this;
    
                        const container = this.$refs["builderContainer"];
                        const builderHolder = document.createElement('div');
                        builderHolder.id = 'builderHolder';
                        container.appendChild(builderHolder)
                        warpInstance.$mount("#builderHolder");
                    }
    
            },
            async addWarp() {
                let warpname = this.getAndClear("warpname");
                let x = this.getAndClear("x");
                let y = this.getAndClear("y");
                let z = this.getAndClear("z");
                let yaw = this.getAndClear("yaw");
                let pitch = this.getAndClear("pitch");
    
                let json = await fetch("./world/warp/add",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, warpname, x, y, z, yaw, pitch})
                });
    
                let data = await json.json();
    
                if(data["State"] == "0") {
                    window.location.href = "./";
                    return;
                }
    
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                    if(data["State"] == "200") {
                        const WarpComponent = Vue.extend(Warp);
                        const warpInstance = new WarpComponent({
                            propsData: {
                                name: warpname,
                                x,
                                y,
                                z,
                                yaw,
                                pitch
                            }
                        });
                        warpInstance.$parent = this;
    
                        const container = this.$refs["warpContainer"];
                        const warpholder = document.createElement('div');
                        warpholder.id = 'warpholder';
                        container.appendChild(warpholder)
                        warpInstance.$mount("#warpholder");
                    }
    
            },
            updateInformation() {
                fetch("./world/information",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, state: this.$refs["state"].value, permission: this.$refs["permission"].value})
                })
                .then(function(res) 
                { 
                    return res.json(); 
                })
                .then(function(data) 
                {
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                })
            },
            updateSettings() {
                fetch("./world/settings",
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify({server: this.$refs["server"].value, world: this.$refs["world"].value, settings: this.getConfiguration()})
                })
                .then(function(res) 
                { 
                    return res.json(); 
                })
                .then(function(data) 
                {
                    document.getElementById("infoText").innerHTML = data["Message"];
                    document.getElementById("infoContainer").removeAttribute("hidden");
                })
            }
        },
      head: {
        title: 'AriesBuildings - Worlds Settings',
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
          { rel: 'stylesheet', href: "/custom.css"}
        ]
      },
      name: 'UsersPage'
    }
    </script>
    
    <style scoped>
    .siteHeader {
    background-image: url('/assets/b7.jpg'); 
    background-size: cover; 
    background-position: center;
    height: 250px;
    }
    
    .py-8 {
        margin-top: 8rem !important;
        margin-bottom: 8rem !important;
    }
    </style>