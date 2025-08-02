extends CharacterBody2D

@onready var anim_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var sfx_player: AudioStreamPlayer2D = $SFX_Player

var speed = 200.0
var dart_speed = 380.0    # How fast to dart
var dart_time = 0.15      # Dart duration in seconds
var dart_cooldown = 0.5   # Time before you can dart again
var last_dir = "down"
var last_dir_vec = Vector2.DOWN

var step_interval = 0.3     # Time between steps (tweak for speed)
var step_timer = 0.0


var is_darting = false
var dart_timer = 0.0
var dart_cooldown_timer = 0.0

func _physics_process(delta):
	# Handle dart cooldown timer
	if dart_cooldown_timer > 0.0:
		dart_cooldown_timer -= delta

	# DART ACTION
	if Input.is_action_just_pressed("dart") and not is_darting and dart_cooldown_timer <= 0.0:
		is_darting = true
		dart_timer = dart_time
		dart_cooldown_timer = dart_cooldown
		# Dart in the last faced direction
		match last_dir:
			"up":
				last_dir_vec = Vector2.UP
			"down":
				last_dir_vec = Vector2.DOWN
			"left":
				last_dir_vec = Vector2.LEFT
			"right":
				last_dir_vec = Vector2.RIGHT

	if is_darting:
		velocity = last_dir_vec * dart_speed
		dart_timer -= delta
		# Play walk or idle animation in the dart direction
		anim_sprite.animation = "walk_" + last_dir
		anim_sprite.play()
		if dart_timer <= 0.0:
			is_darting = false
	else:
		# NORMAL MOVEMENT
		
		var dir = Vector2.ZERO

		if Input.is_action_pressed("ui_right") or Input.is_key_pressed(KEY_D):
			dir.x += 1
		if Input.is_action_pressed("ui_left") or Input.is_key_pressed(KEY_A):
			dir.x -= 1
		if Input.is_action_pressed("ui_down") or Input.is_key_pressed(KEY_S):
			dir.y += 1
		if Input.is_action_pressed("ui_up") or Input.is_key_pressed(KEY_W):
			dir.y -= 1

		if dir != Vector2.ZERO:
			step_timer -= delta

			if step_timer <= 0.0:
				sfx_player.play()
				step_timer = step_interval

			dir = dir.normalized()
			velocity = dir * speed

	# ...animation logic...


			if abs(dir.x) > abs(dir.y):
				if dir.x > 0:
					anim_sprite.animation = "walk_right"
					last_dir = "right"
				else:
					anim_sprite.animation = "walk_left"
					last_dir = "left"
			else:
				if dir.y > 0:
					anim_sprite.animation = "walk_down"
					last_dir = "down"
				else:
					anim_sprite.animation = "walk_up"
					last_dir = "up"
			anim_sprite.play()
		else:
			velocity = Vector2.ZERO
			anim_sprite.animation = "idle_" + last_dir
			anim_sprite.play()
	move_and_slide()
