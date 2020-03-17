<template>
    <div id="app" class="container p-6 mx-auto">
        <h1 class="text-2xl mb-4">Attestation de déplacement dérogatoire</h1>
        <h2 class="mb-4">En application de l'article 1er du décret du 16 mars 2020 portant réglementation des
            déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :</h2>
        <h3 class="mb-4">Je soussigné(e)</h3>
        <div class="flex flex-col mb-4">
            <div class="flex flex-col justify-between mb-4">
                <label for="name">Mme / M.</label>
                <input id="name" name="name" type="text" v-model="name">
            </div>
            <div class="flex flex-col justify-between mb-4">
                <label for="birthdate">Né(e) le :</label>
                <input id="birthdate" name="birthdate" type="date" v-model="birthDate">
            </div>
            <div class="flex flex-col justify-between mb-4">
                <label for="adress">Demeurant</label>
                <input id="adress" name="adress" type="text" v-model="address">
            </div>
        </div>
        <h3 class="mb-4">certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par l'article 1er du décret
            du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du
            virus Covid-19:</h3>
        <div class="mb-4">
            <p class="mb-2">
                <input class="mr-2" id="choix_a" type="radio" name="choix" v-model="choix">
                <label for="choix_a" id="label_choix_a">déplacements entre le domicile et le lieu d'exercice de
                    l'activité professionnelle, lorsqu'ils sont indispensables à l'exercice d'activités ne pouvant être
                    organisées sous forme de télétravail (sur justificatif permanent) ou déplacements professionnels ne
                    pouvant être différés;</label>
            </p>
            <p class="mb-2">
                <input class="mr-2" id="choix_b" type="radio" name="choix" v-model="choix">
                <label for="choix_b" id="label_choix_b">déplacements pour effectuer des achats de première nécessité
                    dans des établissements autorisés (liste sur gouvernement.fr);</label>
            </p>
            <p class="mb-2">
                <input class="mr-2" id="choix_d" type="radio" name="choix" v-model="choix">
                <label for="choix_d" id="label_choix_d">déplacements pour motif familial impérieux, pour l'assistance
                    aux personnes vulnérables ou la garde d'enfants;</label>
            </p>
            <p class="mb-2">
                <input class="mr-2" id="choix_e" type="radio" name="choix" v-model="choix">
                <label for="choix_e" id="label_choix_e">déplacements brefs, à proximité du domicile, liés à
                    l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective,
                    et aux besoins des animaux de compagnie.</label>
            </p>
        </div>
        <div>
            <div class="flex flex-col mb-4">
                <div class="flex flex-col justify-between mb-4">
                    <label for="place">Fait à</label> <input id="place" name="place" type="text" v-model="place">
                </div>
                <div class="flex flex-col justify-between mb-4">
                    <label for="date">le</label> <input id="date" name="date" type="date" v-model="date">
                </div>
            </div>
        </div>
        <div>
            <h4 class="text-gray-700 font-bold mb-4">Signature</h4>
            <drawing-board ref="drawingBoard"></drawing-board>
            <button class="inline-block btn mt-4" @click="$refs.drawingBoard.clear()">Effacer signature</button>
        </div>
        <div class="flex justify-between mt-6">
            <button class="btn">Générer PDF</button>
            <button class="btn" @click="resetForm()">Reset Formulaire</button>
        </div>
    </div>
</template>

<script>
    import DrawingBoard from "./components/DrawingBoard";

    export default {
        name: 'App',
        components: { DrawingBoard },
        data() {
            return {
                name: '',
                birthDate: '',
                address: '',
                place: '',
                choix: '',
                date: '',
                provider: {
                    // This is the CanvasRenderingContext that children will draw to.
                    context: null
                }
            }
        },
        // Allows any child component to `inject: ['provider']` and have access to it.
        provide () {
            return {
                provider: this.provider
            }
        },
        mounted() {
            // Current date format for input type=date
            this.date = new Date().toISOString().slice(0, 10);
        },
        methods: {
            resetForm() {
                this.name = '';
                this.birthDate = '';
                this.address = '';
                this.place = '';
                this.choix = '';
                this.date = new Date().toLocaleDateString();
            }
        }
    }
</script>

<style>
</style>
