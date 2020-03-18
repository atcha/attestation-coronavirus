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
        <h3 class="mb-4">certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par l'article
            1er du décret
            du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du
            virus Covid-19:</h3>
        <div class="mb-4">
            <p class="mb-2" v-for="value in choiceValues" :key="value.id">
                <input class="mr-2" :id="'choice_' + value.id" type="radio" name="choice" :value="value.text" v-model="choice">
                <label :for="'choice_' + value.id">{{value.text}}</label>
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
            <button class="btn" @click="createPdf">Générer PDF</button>
            <button class="btn" @click="resetForm">Reset Formulaire</button>
        </div>
    </div>
</template>

<script>
    import DrawingBoard from "./components/DrawingBoard";
    import jsPdf from 'jspdf';

    export default {
        name: 'App',
        components: {DrawingBoard},
        data() {
            return {
                name: '',
                birthDate: '',
                address: '',
                place: '',
                choice: '',
                date: '',
                provider: {
                    // This is the CanvasRenderingContext that children will draw to.
                    canvas: null,
                    context: null
                },
                choiceValues: [
                    {
                        id: 0,
                        text: "déplacements entre le domicile et le lieu d'exercice de l'activité professionnelle, lorsqu'ils sont indispensables à l'exercice d'activités ne pouvant être organisées sous forme de télétravail (sur justificatif permanent) ou déplacements professionnels ne pouvant être différés;"
                    },
                    {
                        id: 1,
                        text: "déplacements pour effectuer des achats de première nécessité dans des établissements autorisés (liste sur gouvernement.fr);"
                    },
                    {
                        id: 2,
                        text: "déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables ou la garde d'enfants;"
                    },
                    {
                        id: 3,
                        text: "déplacements brefs, à proximité du domicile, liés à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective, et aux besoins des animaux de compagnie."
                    }
                ]
            }
        },
        // Allows any child component to `inject: ['provider']` and have access to it.
        provide() {
            return {
                provider: this.provider
            }
        },
        mounted() {
            // Current date format for input type=date
            this.date = new Date().toISOString().slice(0, 10);
            console.log(this.provider.context);
        },
        methods: {
            resetForm() {
                this.name = '';
                this.birthDate = '';
                this.address = '';
                this.place = '';
                this.choice = '';
                this.date = new Date().toLocaleDateString();
            },
            createPdf() {
                let pdfName = 'Attestation_de_deplacement_derogatoire';
                let doc = new jsPdf();

                // Parameters
                let pageCenter = doc.internal.pageSize.getWidth() / 2;
                let pageSize = {
                    width: doc.internal.pageSize.getWidth()
                };

                // Text from page
                let title = document.getElementsByTagName('h1')[0].innerText.toUpperCase();
                let subtitle = doc.splitTextToSize(document.getElementsByTagName('h2')[0].innerText, pageSize.width);
                let firstIntitule = document.getElementsByTagName('h3')[0].innerText;
                let secondIntitule = doc.splitTextToSize(document.getElementsByTagName('h3')[1].innerText, pageSize.width);
                let birthDate = '';
                if (this.birthDate.length > 0) {
                    birthDate = new Date(this.birthDate).toLocaleDateString();
                }
                let choice = doc.splitTextToSize(this.choice, pageSize.width - 15);
                let date = '';
                if (this.date.length > 0) {
                    date = new Date(this.date).toLocaleDateString();
                }
                let beforeSign = 'Fait à ' + this.place + ', le ' + date;
                let sign = this.provider.canvas.toDataURL();

                doc.setFont('Helvetica', 'bold');
                doc.text(title, pageCenter, 25, {align: 'center'});
                doc.setFont('Helvetica', 'normal');
                doc.setFontSize(12);
                doc.text(subtitle, pageCenter, 35, {align: 'center'});
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(13);
                doc.text(firstIntitule, 15, 65);
                doc.text('Mme / M. ' + this.name, 15, 75);
                doc.text('Né(e) le : ' + birthDate, 15, 85);
                doc.text('Demeurant : ' + this.address, 15, 95);
                doc.text(secondIntitule, 15, 115);
                doc.rect(15, 150, 3, 3, 'F');
                doc.text(choice, 30, 150);
                doc.setFont('Helvetica', 'normal');
                doc.setFontSize(11);
                doc.text(beforeSign, pageSize.width - 15, 180, {align: 'right'});
                doc.addImage(sign, 'PNG', 150, 185, 60, 60);
                doc.save(pdfName + '.pdf');
            }
        }
    };

</script>

<style>
</style>
