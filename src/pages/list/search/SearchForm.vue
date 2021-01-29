<template>
  <a-card :bordered="false" class="search-form">
    <a-form :form="form" @submit="handleSearch">
      <header-search @do-search="handleDoSearch" @switch-dataset="switchDataset" :searching="searching"/>
<!--      <form-row label="Domain">-->
<!--        <a-form-item>-->
<!--          <tag-select>-->
<!--            <tag-select-option @click="handleClickTag" v-for="item in level1Tags" :key="item">-->
<!--              {{ item }}-->
<!--            </tag-select-option>-->
<!--          </tag-select>-->
<!--        </a-form-item>-->
<!--      </form-row>-->
<!--      <form-row label="Area">-->
<!--        <a-form-item fieldDecoratorId="selectedLevel2Tags">-->
<!--          <a-select mode="multiple" style="max-width: 286px">-->
<!--            <a-select-option v-for="item in allLevel2Tags['CS ']"-->
<!--                             :key="item" :value="item">{{ item }}-->
<!--            </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-item>-->
<!--&lt;!&ndash;        <a @click="level2TagsM">只看自己的</a>&ndash;&gt;-->
<!--      </form-row>-->
    </a-form>
  </a-card>
</template>

<script>
// import TagSelect from '../../../components/tool/TagSelect'
// import FormRow from '../../../components/form/FormRow'
import HeaderSearch from '@/layouts/header/HeaderSearch'

// const TagSelectOption = TagSelect.Option

export default {
  name: 'SearchForm',
  components: {
    // FormRow, TagSelectOption, TagSelect,
    HeaderSearch},
  props: ['searching'],
  state: {
    selectedLevel2Tags: [],
  },
  data() {
    return {
      form: this.$form.createForm(this, {name: 'search form'}),
      selectedLevel1Tags: [],
      level1Tags: [
        'CS ', 'Medical ', 'Civil ', 'ECE ', 'biochemistry ', 'MAE ',
        'Psychology  '
      ],
      allLevel2Tags: {
        "CS ": [" Symbolic computation  ", " Computer vision  ", " Computer graphics  ", " Operating systems  ", " Machine learning  ", " Data structures  ", " network security  ", " Image processing  ", " Parallel computing  ", " Distributed computing  ", " Algorithm design  ", " Computer programming  ", " Relational databases  ", " Software engineering  ", " Bioinformatics  ", " Cryptography  ", " Structured Storage  "],
        "Medical ": [" Alzheimer's Disease  ", " Parkinson's Disease  ", " Sprains and Strains  ", " Cancer  ", " Sports Injuries  ", " Senior Health  ", " Multiple Sclerosis  ", " Hepatitis C  ", " Weight Loss  ", " Low Testosterone  ", " Fungal Infection  ", " Diabetes  ", " Parenting  ", " Birth Control  ", " Heart Disease  ", " Allergies  ", " Menopause  ", " Emergency Contraception  ", " Skin Care  ", " Myelofibrosis  ", " Hypothyroidism  ", " Headache  ", " Overactive Bladder  ", " Irritable Bowel Syndrome  ", " Polycythemia Vera  ", " Atrial Fibrillation  ", " Smoking Cessation  ", " Lymphoma  ", " Asthma  ", " Bipolar Disorder  ", " Crohn's Disease  ", " Idiopathic Pulmonary Fibrosis  ", " Mental Health  ", " Dementia  ", " Rheumatoid Arthritis  ", " Osteoporosis  ", " Medicare  ", " Psoriatic Arthritis  ", " Addiction  ", " Atopic Dermatitis  ", " Digestive Health  ", " Healthy Sleep  ", " Anxiety  ", " Psoriasis  ", " Ankylosing Spondylitis  ", " Children's Health  ", " Stress Management  ", " HIV/AIDS  ", " Depression  ", " Migraine  ", " Osteoarthritis  ", " Hereditary Angioedema  ", " Kidney Health  ", " Autism  ", " Schizophrenia  ", " Outdoor Health  "],
        "Civil ": [" Green Building  ", " Water Pollution  ", " Smart Material  ", " Ambient Intelligence  ", " Construction Management  ", " Suspension Bridge  ", " Geotextile  ", " Stealth Technology  ", " Solar Energy  ", " Remote Sensing  ", " Rainwater Harvesting  ", " Transparent Concrete  ", " Highway Network System  ", " Nano Concrete  ", " Bamboo as a Building Material  ", " Underwater Windmill  "],
        "ECE ": [" Electric motor  ", " Satellite radio  ", " Digital control  ", " Microcontroller  ", " Electrical network  ", " Electrical generator  ", " Electricity  ", " Operational amplifier  ", " Analog signal processing  ", " State space representation  ", " Signal-flow graph  ", " Electrical circuits  ", " Lorentz force law  ", " System identification  ", " PID controller  ", " Voltage law  ", " Control engineering  ", " Single-phase electric power  "],
        "biochemistry ": [" Molecular biology  ", " Enzymology  ", " Southern blotting  ", " Northern blotting  ", " Human Metabolism  ", " Polymerase chain reaction  ", " Immunology  ", " Genetics  ", " Cell biology  ", " DNA/RNA sequencing  "],
        "MAE ": [" Fluid mechanics  ", " Hydraulics  ", " computer-aided design  ", " Manufacturing engineering  ", " Machine design  ", " Thermodynamics  ", " Materials Engineering  ", " Strength of materials  ", " Internal combustion engine  "],
        "Psychology  ": [" Prenatal development  ", " Attention  ", " Eating disorders  ", " Borderline personality disorder  ", " Prosocial behavior  ", " False memories  ", " Problem-solving  ", " Prejudice  ", " Antisocial personality disorder  ", " Nonverbal communication  ", " Leadership  ", " Child abuse  ", " Gender roles  ", " Depression  ", " Social cognition  ", " Seasonal affective disorder  ", " Person perception  ", " Media violence  ", " Schizophrenia  "]
      }
    }
  },
  computed: {
    level2Tags: function () {
      console.log('form', this.form.getFieldValue('selectedLevel1Tags'))
      return this.form.getFieldValue('selectedLevel1Tags')
      // return ['debug'].concat(this.allLevel2Tags[this])
    }
  },
  methods: {
    handleDoSearch(query) {
      this.$emit("do-search", query)
    },
    lookMyself() {
      this.form.setFieldsValue({
        owner: '3'
      })
    },
    switchDataset() {
      console.log('switchDataset')
      this.$emit("switch-dataset")
    },
    level2TagsM(arg) {
      let values = this.form.getFieldValue('selectedLevel1Tags')
      console.log('form method', arg, values)
      return values + 'constant'
    },
    handleSearch() {
    },
    handleChange(e) {
      console.log('filter change')
      this.$emit('filter-change', e)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
