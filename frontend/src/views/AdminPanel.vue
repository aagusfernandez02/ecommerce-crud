<script setup>
</script>

<template>
    <main>
        <h1 class="text-h4 text-center pt-2">Admin panel</h1>

        <v-table class="mt-10">
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Calories
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre 1</td>
                    <td>1000</td>
                </tr>
                <tr>
                    <td>Nombre 2</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td>Nombre 3</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>Nombre 4</td>
                    <td>4000</td>
                </tr>
            </tbody>
        </v-table>
    </main>
</template>

<style scoped lang="scss">
main {
    @include main;
}
</style>