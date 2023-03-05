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
                    <p class="display-4" style="font-weight: bold; padding: 5px 40px;transform: skew(30deg); color: #000;text-shadow: none;">
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
                <h1>{{this?.world}}</h1>
                <div class="col-4">
                    <label>Server</label>
                    <input class="form-control" type="text" :value='this?.server' ref="server" disabled>
                </div>
                <div class="col-4">
                    <label>Welt</label>
                    <input class="form-control" type="text" :value='this?.world' ref="world" disabled>
                </div>
                <div class="col-4">
                    <label>Type</label>
                    <input class="form-control" type="text" :value='this.type' ref="type" disabled>
                </div>
                <div class="col-4">
                    <label>Status</label>
                        <select :value='this?.state' ref="state" class="form-select form-select-sm" aria-label="form-select-sm example" required>
                            <option value="0">Private</option>
                            <option value="1">Nicht angefangen</option>
                            <option value="2">In Arbeit</option>
                            <option value="3">Fast fertig</option>
                            <option value="4">Unter Begutachtung</option>
                            <option value="5">Abgeschlossen</option>
                        </select>
                </div>
                <div class="col-4">
                    <label>Rechte</label>
                    <input class="form-control" type="text" :value='this?.permission' ref="permission">
                </div>
                <div class="col-12 pt-3">
                    <button @click="updateInformation()" class="btn btn-primary">Aktualisieren</button>
                </div>
            </div>

            <div class="row">
                <div class="col-9 pt-3"><h1>Einstellungen</h1></div>
                    <div class="col-4">
                        <Slider :checked='this.configuration[0]' ref="0" text="Items fallenlassen" />
                        <Slider :checked='this.configuration[1]' ref="1" text="Items aufheben" />
                        <Slider :checked='this.configuration[2]' ref="2" text="Blöcke platzieren" />
                        <Slider :checked='this.configuration[3]' ref="3" text="Blöcke zerstören" />
                        <Slider :checked='this.configuration[4]' ref="4" text="Interagieren" />
                    </div>
                    <div class="col-4">
                        <Slider :checked='this.configuration[5]' ref="5" text="Hunger" />
                        <Slider :checked='this.configuration[6]' ref="6" text="Schaden" />
                        <Slider :checked='this.configuration[7]' ref="7" text="Explosionen" />
                        <Slider :checked='this.configuration[8]' ref="8" text="WorldEdit" />
                        <Slider :checked='this.configuration[9]' ref="9" text="Block Physik" />
                    </div>
                    <div class="col-4">
                        <Slider :checked='this.configuration[10]' ref="10" text="Austrocknen (Korallen)" />
                        <Slider :checked='this.configuration[12]' ref="12" text="WhiteList" />
                        <Slider :checked='this.configuration[13]' ref="13" text="Redstone" />
                    </div>
                </div>
                <div class="row">
                    <div class="col pt-3">
                        <button @click="updateSettings()" class="btn btn-primary">Aktualisieren</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9 pt-3"><h1>Warps</h1></div>
                        <div class="col-9">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>X</th>
                                            <th>Y</th>
                                            <th>Z</th>
                                            <th>Yaw</th>
                                            <th>Pitch</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody ref="warpContainer" id="warpContainer">
                                        <Warp v-for='warp in this.warps' :key='warp.Name' :name='warp.Name' :x='warp.X' :y='warp.Y' :z='warp.Z' :yaw='warp.Yaw' :pitch='warp.Pitch' />
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><input placeholder="Name" ref="warpname" type="text" class="form-control"></td>
                                            <td><input placeholder="X" ref="x" pattern="\d+" type="number" class="form-control"></td>
                                            <td><input placeholder="Y" ref="y" type="number" class="form-control"></td>
                                            <td><input placeholder="Z" ref="z" type="number" class="form-control"></td>
                                            <td><input placeholder="Yaw" ref="yaw" type="number" class="form-control"></td>
                                            <td><input placeholder="Pitch" ref="pitch" type="number" class="form-control"></td>
                                            <td><button @click='addWarp()' class="btn btn-primary">Hinzufügen</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                <div class="col-9 pt-3"><h1>Builder</h1></div>
                    <div class="col-3">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody ref="builderContainer" id="builderContainer">
                                        <Builder v-for='builder in builders' :key='builder.Name' :name='builder.Name' :uuid='builder.UUID' />
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td><input placeholder="Name" ref="buildername" type="text" class="form-control"></td>
                                            <td><button @click='addBuilder()' class="btn btn-primary">Hinzufügen</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
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
        let settings = context?.req?.data?.Settings.split("");
        return {
            server: context?.req?.data?.Server,
            world: context?.req?.data?.World,
            type: context?.req?.data?.Type,
            state: context?.req?.data?.State,
            permission: context?.req?.data?.Permission,
            configuration: settings,
            warps: context?.req?.data?.Warps,
            builders: context?.req?.data?.Builder
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

                    console.log(data);
                    const warpInstance = new WarpComponent({
                        propsData: {
                            name: buildername,
                            uuid: data["UUID"]
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
  name: 'WorldsPage'
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