<template>
    <div>
        <div class="row">
            <div class="col-4" style="margin: auto">
                <form>
                    <div class="form-group row">
                        <label for="formFirstName" class="col-3 col-form-label">First name</label>
                        <div class="col-9">
                            <input type="text" class="form-control" id="formFirstName" placeholder="First name" v-model="editedUser.firstName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="formLastName" class="col-3 col-form-label">Last name</label>
                        <div class="col-9">
                            <input type="text" class="form-control" id="formLastName" placeholder="Last name" v-model="editedUser.lastName">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary mr-2" @click="saveUser()">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelUser()">Cancel</button>
                </form>
            </div>
        </div>
        <div class="row mt-5" v-if="errorStatus">
            <div class="card col-4" style="margin:auto">
            <div class="card-body">
                <h5 class="card-title">Error</h5>
                <p class="card-text">{{ errorMsg }}</p>
                <button type="button" class="btn btn-primary mr-2" @click="closeError()">Close</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editedUser: {
                firstName: '',
                lastName: ''
            },
            errorStatus: false,
            errorMsg: ''
        }
    },
    props: ['edit', 'user'],
    methods: {
        saveUser() {
            console.log('UserEdit', 'saveUser', this.editedUser);
            const newUser = {
                first_name: this.editedUser.firstName,
                last_name:  this.editedUser.lastName
            };
            let dispatchAction;
            if (this.edit) {
                dispatchAction = 'updateUser';
                newUser.id = this.user.id;
                newUser.url = this.user.url;
                newUser.status = this.user.status;
            } else {
                dispatchAction = 'addNewUser';
            }
            this.$store.dispatch(dispatchAction, newUser)
            .then(() => {
                console.log('UserEdit', 'saveUser', 'User was saved');
                this.leavePage();
            })
            .catch((err) => {
                this.errorStatus = true;
                this.errorMsg = err.toString();
            });
        },
        cancelUser() {
            console.log('UserEdit', 'cancelUser');
            this.leavePage();
        },
        leavePage() {
            this.$router.push({ name: 'home' });
        },
        closeError() {
            this.errorStatus = false;
        }
    },
    created() {
        console.log('UserEdit', this.edit, this.user);
        if (this.edit) {
            if (!this.user) {
                console.error('UserEdit', 'Missing user props in edit mode!');
                return;
            }
            this.editedUser.firstName = this.user.first_name;
            this.editedUser.lastName  = this.user.last_name;
        }
    }
};
</script>