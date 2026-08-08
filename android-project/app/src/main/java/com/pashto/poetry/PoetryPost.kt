package com.pashto.poetry

import com.google.gson.annotations.SerializedName

data class PoetryResponse(
    @SerializedName("ok") val ok: Boolean,
    @SerializedName("channel") val channel: String,
    @SerializedName("title") val title: String?,
    @SerializedName("avatar") val avatar: String?,
    @SerializedName("posts") val posts: List<PoetryPost>
)

data class PoetryPost(
    @SerializedName("id") val id: Any,
    @SerializedName("text") val text: String,
    @SerializedName("timestamp") val timestamp: Long,
    @SerializedName("formattedDate") val formattedDate: String,
    @SerializedName("authorName") val authorName: String,
    @SerializedName("mediaType") val mediaType: String,
    @SerializedName("photoUrl") val photoUrl: String?,
    @SerializedName("videoUrl") val videoUrl: String?
)
