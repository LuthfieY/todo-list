<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th class="text-center">TO DO</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in todoList" :key="i">
              <td class="align-middle w-75">
                {{item.task}}
              </td>
              <td class="align-middle text-center w-75">
                <button class="btn btn-info btn-sm mx-1" @click="handleEdit(item._id)">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm mx-1" @click="handleDelete(item._id)">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td class="align-middle text-center w-75">
                <div class="form-group">
                  <label for="">{{
                  editMode ? "Edit" : "Add"
                  }}
                  </label>
                  <input type="text" class="form-control" v-model="todoItem.task" />
                </div>
              </td>
              <td class="align-middle text-center w-25">
                <button class="btn btn-primary btn-sm mx-1" @click="handleToDoItem">
                  {{ editMode ? "Edit" : "Add"}}
                </button>
                <button v-if="editMode" class="btn btn-danger btn-sm mx-1" @click="handleCancel">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
const todoUrl = "http://localhost:3000/todos";
export default {

  data() {
    return {
      todoList: [],
      todoItem: {},
      editMode: false
    };
  },
  methods: {
    handleEdit(_id) {
      this.editMode = true;
      this.todoItem = this.todoList.find((item) => item._id == _id);
    },
    handleCancel() {
      this.editMode = false;
      this.todoItem = "";
    },
    async handleToDoItem() {
      const _id = this.todoItem._id;

      if (this.editMode) {
        await Axios.patch(`${todoUrl}/${_id}`, this.todoItem);
        this.editMode = false;
        this.todoItem.task = "";
      } else {
        await Axios.post(todoUrl, this.todoItem);
        this.todoItem.task = "";
      }
      Axios.get(todoUrl).then(
        (response) => (this.todoList = response.data)
      );
    },
    async handleDelete(_id) {
      await Axios.delete(`${todoUrl}/${_id}`);
      Axios.get(todoUrl).then(
        (response) => (this.todoList = response.data)
      );
    },
  },
  created() {
    Axios.get(todoUrl).then((response) => (this.todoList = response.data));
  },
};

</script>