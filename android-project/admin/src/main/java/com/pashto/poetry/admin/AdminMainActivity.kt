package com.pashto.poetry.admin

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.pashto.poetry.admin.databinding.ActivityAdminMainBinding
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class AdminMainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAdminMainBinding
    private lateinit var adapter: AdminPostAdapter
    private lateinit var apiService: AdminApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAdminMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup Toolbar
        setSupportActionBar(binding.toolbarAdmin)
        supportActionBar?.setDisplayShowTitleEnabled(false)

        // Setup RecyclerView
        binding.rvAdminPosts.layoutManager = LinearLayoutManager(this)
        adapter = AdminPostAdapter(this, emptyList()) { postToDelete ->
            showDeleteConfirmation(postToDelete)
        }
        binding.rvAdminPosts.adapter = adapter

        // Setup OkHttpClient
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(logging)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build()

        // Point to our shared deployment server URL
        val retrofit = Retrofit.Builder()
            .baseUrl("https://ais-pre-vobyra5qwdw2xoypqezono-694908262330.europe-west2.run.app/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(AdminApiService::class.java)

        // Setup Refresh Listener
        binding.swipeRefreshAdmin.setOnRefreshListener {
            loadCustomPosts()
        }

        // Setup FAB to add post
        binding.fabAddPost.setOnClickListener {
            val intent = Intent(this, AdminAddActivity::class.java)
            startActivity(intent)
        }

        // Initial Load
        loadCustomPosts()
    }

    override fun onResume() {
        super.onResume()
        // Refresh when coming back from AddActivity
        loadCustomPosts()
    }

    private fun loadCustomPosts() {
        binding.progressBarAdmin.visibility = if (binding.swipeRefreshAdmin.isRefreshing) View.GONE else View.VISIBLE
        binding.tvNoPosts.visibility = View.GONE

        apiService.getCustomPosts().enqueue(object : Callback<AdminPoetryResponse> {
            override fun onResponse(call: Call<AdminPoetryResponse>, response: Response<AdminPoetryResponse>) {
                binding.progressBarAdmin.visibility = View.GONE
                binding.swipeRefreshAdmin.isRefreshing = false

                if (response.isSuccessful && response.body() != null) {
                    val posts = response.body()!!.posts
                    adapter.updateData(posts)
                    if (posts.isEmpty()) {
                        binding.tvNoPosts.visibility = View.VISIBLE
                    }
                } else {
                    Toast.makeText(this@AdminMainActivity, "د ډیټا ترلاسه کولو کې ستونزه راغله", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<AdminPoetryResponse>, t: Throwable) {
                binding.progressBarAdmin.visibility = View.GONE
                binding.swipeRefreshAdmin.isRefreshing = false
                Toast.makeText(this@AdminMainActivity, "د انټرنیټ اړیکه نشته", Toast.LENGTH_SHORT).show()
                binding.tvNoPosts.visibility = View.VISIBLE
            }
        })
    }

    private fun showDeleteConfirmation(post: AdminPoetryPost) {
        AlertDialog.Builder(this)
            .setTitle(getString(R.string.delete))
            .setMessage(getString(R.string.confirm_delete))
            .setPositiveButton(getString(R.string.yes)) { _, _ ->
                deletePostOnServer(post.id)
            }
            .setNegativeButton(getString(R.string.no), null)
            .show()
    }

    private fun deletePostOnServer(postId: String) {
        binding.progressBarAdmin.visibility = View.VISIBLE
        apiService.deletePost(postId).enqueue(object : Callback<AdminDeleteResponse> {
            override fun onResponse(call: Call<AdminDeleteResponse>, response: Response<AdminDeleteResponse>) {
                binding.progressBarAdmin.visibility = View.GONE
                if (response.isSuccessful && response.body()?.ok == true) {
                    Toast.makeText(this@AdminMainActivity, getString(R.string.deleted_toast), Toast.LENGTH_SHORT).show()
                    loadCustomPosts()
                } else {
                    Toast.makeText(this@AdminMainActivity, "د حذف کولو تېروتنه رامنځته شوه", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<AdminDeleteResponse>, t: Throwable) {
                binding.progressBarAdmin.visibility = View.GONE
                Toast.makeText(this@AdminMainActivity, "د انټرنیټ اړیکه نشته", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
